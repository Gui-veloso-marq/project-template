import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'

interface Answer {
  item: string,
  answer: string
}

@Injectable({
  providedIn: 'root'
})
export class QuestionarioService {
  
  public questionario: any;

  constructor(private http: HttpClient) {
    this.loadQuestions();
   }

   private answer = {
    user: '',
    data: '',
    local: '',
    answers: [] as Answer[]
   }

   loadQuestions(): void {
    this.http.get(`./assets/checklist.json`).subscribe((res: any) => {
      this.questionario = res;
      const questions = res.reduce((acc, c) => {
        const normalQuestions = c.questions.map(q => ({
          item: q,
          answer: ''
        }));

        const extraQuestions = Array.isArray(c['extraQuestions']) 
          ? c['extraQuestions'].map(eq => ({
              item: eq,
              answer: ''
            })) 
          : [];
  
        return [...acc, ...normalQuestions, ...extraQuestions];
      }, []);
      
      this.answer.answers = questions;
    });
  }


   sendAnswer(answer: Answer): void {
    this.answer.answers.find(x => x.item === answer.item)!.answer = answer.answer
   }

   postAnswer() {
    let answers: any = localStorage.getItem('answers');
    if(answers) {
      answers = JSON.parse(answers);
    } else {
      answers = [];
    }
    answers.push(this.answer)
    localStorage.setItem('answers', JSON.stringify(answers));
   }

  
}
