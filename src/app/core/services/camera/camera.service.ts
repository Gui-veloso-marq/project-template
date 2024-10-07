import { Component, ElementRef, NgZone, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Camera } from '../../models/camera';
import { Picture } from '../../models/picture';

export class CameraService {

  
  private cameraSubject = new BehaviorSubject<Picture>({image: false, show: false});

  camera$: Observable<Picture> = this.cameraSubject.asObservable();

  cameraOn(): void {
    this.cameraSubject.next({image: false, show: true});
}

  cameraOff(image: boolean): void {
      this.cameraSubject.next({image, show: false});
  }

  async all(): Promise<Camera[]> {
    const mediaDevices = await navigator.mediaDevices.enumerateDevices();

    return mediaDevices
      .filter(m => m.kind === 'videoinput' && m.deviceId)
      .map((mediaDevice, index) => new Camera(mediaDevice, index));
  }

  async requestAccess(): Promise<void> {
    const constraints = {
      video: true,
      audio: false
    };

    return navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        const tracks = stream.getTracks();

        tracks.forEach(track => track.stop());
      });
  }

  async hasAccess(): Promise<boolean> {
    const mediaDevices = await navigator.mediaDevices.enumerateDevices();

    return mediaDevices
      .filter(m => m.kind === 'videoinput' && m.deviceId)
      .length !== 0;
  }
}