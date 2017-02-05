import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';

// components
import { MainComponent }  from './main.component';
import { RegistrationComponent } from './../registration/registration.component';
import { WelcomeComponent } from './../welcome/welcome.component';
import { PlayComponent } from './../play/play.component';
import { ScoreComponent } from './../score/score.component';

// services
import { LoginService } from './../shared/services/loggin.service';
import { PlayService } from './../play/play.service';
import { BasicAlgorithmService } from './../play/basic-algorithm.service';
import { ScoreService } from './../shared/services/score.service';
import { StorageService } from './../shared/services/storage.service';
import { LocalStorageService } from './../shared/services/local-storage.service';

const appRoutes: Routes = [
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: '',
    redirectTo: '/welcome', pathMatch: 'full'
  },
  {
    path: 'play',
    component: PlayComponent
  }
];

@NgModule({
  providers: [
    LoginService,
    PlayService,
    BasicAlgorithmService,
    ScoreService,
    LocalStorageService,
    StorageService
  ],
  imports:      [
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    MainComponent,
    RegistrationComponent,
    WelcomeComponent,
    PlayComponent,
    ScoreComponent
  ],
  bootstrap:    [ MainComponent ]
})
export class MainModule {
  constructor() {}
}
