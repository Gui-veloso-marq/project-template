import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { QuestionarioService } from '../../core/services/questionario/questionario.service';
import { CameraService } from '../../core/services/camera/camera.service';
import * as bootsrap from 'bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  // public form: FormGroup;
  data =  new Date().toLocaleDateString();
  public cameraOn = false;
  @ViewChild('closeVistoria') closeVistoriaElement;
  public modal: any;

  constructor(
    public questionarioService: QuestionarioService, 
    public  cameraService: CameraService
  ) {

  }
  
  ngOnInit(): void {
    this.cameraService.camera$.subscribe(camera => {
      this.cameraOn = camera.show;
      if( this.cameraOn) {
        this.closeVistoriaElement?.nativeElement.click();
      } else {
        const element = document.querySelector('#checkModal');
      if (element) {
        this.modal = new bootsrap.Modal(element);
        this.modal.show();
      }
      }
    })
  }

  refresh(): void {
   this.questionarioService.loadQuestions();
  }
}
