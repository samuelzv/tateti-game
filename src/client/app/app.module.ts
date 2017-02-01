import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AppComponent }  from './app.component';
import { RegistrationComponent } from './registration/components/registration.component';
import { WelcomeComponent } from './welcome/components/welcome.component';
import { PlayComponent } from './play/components/play.component';
import { LoginService } from './common/services/loggin.service';

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
    LoginService
  ],
  imports:      [
    BrowserModule ,
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    RegistrationComponent,
    WelcomeComponent,
    PlayComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {
  constructor() {}
}
