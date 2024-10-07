import { Component, Input } from '@angular/core';
import { QuestionarioService } from '../../services/questionario/questionario.service';
import { CameraService } from '../../services/camera/camera.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.scss'
})
export class CardDetailComponent {
  constructor(
    private questionarioService: QuestionarioService, 
    public cameraService: CameraService) {

  }

  @Input()
  question: string;

  @Input()
  theme: string;
  
  public actions = ['OK', 'NC', 'NA'];

  public answer = 'OK';

  showComments = false;
  comment = '';

  sendAnswer(answer: string) {
    this.answer = answer;
    this.questionarioService.sendAnswer({
      item: this.question,
      answer
    })
  }

   themeAnswer(item: string): string {
    if(this.answer != item) return '';
     const colors = {
      OK: 'item-ok',
      NC: 'item-nc',
      NA: 'item-na'
    }
    return colors[this.answer];
  }
  

}
