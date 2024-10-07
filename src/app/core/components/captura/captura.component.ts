import { Component, ElementRef, EventEmitter, Input, NgZone, Output, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { CameraService } from '../../services/camera/camera.service';
import { Camera } from '../../models/camera';

@Component({
  selector: 'app-captura',
  templateUrl: './captura.component.html',
  styleUrl: './captura.component.scss'
})
export class CapturaComponent implements OnInit, OnDestroy, AfterViewInit {


  @ViewChild('video') video: ElementRef;
  @ViewChild('cameraClickSound') cameraClickSound: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @Output() close: EventEmitter<string> = new EventEmitter();

  camera: Camera;
  cameras: Camera[];
  public deviceWidth = window.innerWidth;
  public deviceHeight = window.innerHeight;
  public capturando = true;
  private image: any;

  constructor(
    private router: Router,
    private cameraService: CameraService,
    private ngZone: NgZone,
  ) {

  }

  ngOnInit(): void {
    this.cameraService.hasAccess().then(access => {
      if (access) {
        this.cameraService.all().then(cameras => {
          this.cameras = cameras;
          this.abrirCamera(this.cameras[cameras.length -1]);
        });
      } else {
        this.cameraService.requestAccess()
      }
    });
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.camera?.close();
  }


  abrirCamera(camera: Camera): void {
    if (!camera) {
      return;
    }

    this.camera?.close();
    this.camera = camera;

    this.camera.open(this.video).catch((e) => {
      console.log(e);

    });
  }

  capturarImagem(): void {
    this.capturando = false;
    if (!this.camera) {
      return;
    }
    setTimeout(() => {
      this.play();
      this.camera.takePicture(this.canvas.nativeElement);
      this.camera.close();
    });
  }

  play(): void {
    // this.cameraClickSound.nativeElement?.play();
  }

  capturarNovamente(): void {
    this.capturando = true;
    setTimeout(() => {
      this.abrirCamera(this.camera);
    }, 100);
  }

  trocarCamera(): void {
    const indexOf = (this.cameras.indexOf(this.camera) + 1) % this.cameras.length;
    const camera = this.cameras[indexOf];

    this.abrirCamera(camera);
  }

  confirmarCaptura(): void {
    this.canvas.nativeElement.toBlob((blob: any) => this.ngZone.run(() => this.enviarCaptura(blob)), 'image/jpeg', 1);
  }

  enviarCaptura(blob: Blob): void {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      this.image = reader.result;
      this.closeCamera(true);
    }
  }

  closeCamera(salvar: boolean): void {
    // if(salvar) {
    //   this.close.emit(this.image);
    // }
    this.cameraService.cameraOff(salvar);
  }
  
}
