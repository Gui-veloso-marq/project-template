import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { CardItemComponent } from './core/components/card-item/card-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardDetailComponent } from './core/components/card-detail/card-detail.component';
import { CapturaComponent } from './core/components/captura/captura.component';
import { CameraService } from './core/services/camera/camera.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardItemComponent,
    CardDetailComponent,
    CapturaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [CameraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
