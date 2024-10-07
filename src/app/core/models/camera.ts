import { ElementRef } from '@angular/core';

export class Camera {

  private video: any;

  constructor(info: any, index: number) {
    this.devideId = info.deviceId;
    this.title = info.label || index + 1;
  }

  devideId: string;
  title: string;
  isOpen = false;
  mediaStream?: MediaStream;

  async open(elementRef: ElementRef): Promise<MediaStream> {
    const video = { deviceId: { exact: this.devideId } };

    const constraints = {
      video,
      audio: false
    };

    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

    this.mediaStream = mediaStream;
    this.isOpen = true;
    this.video = elementRef.nativeElement;
    
    elementRef.nativeElement.srcObject = mediaStream;

    return this.mediaStream;
  }

  takePicture(target: any): void {
    if (!this.video) {
      return;
    }

    const width = this.video.width;
    const height = this.video.height;     

    target.width = width;
    target.height = height;

    const context = target.getContext('2d');
    context?.drawImage(this.video, 0, 0, width, height);
  }

  close(): void {
    if (!this.mediaStream) {
      return;
    }

    const tracks = this.mediaStream.getTracks();

    tracks.forEach(track => {
      track.stop();
    });

    this.isOpen = false;
  }
}