import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { RegistrationComponent } from './registration/components/registration.component';
import { WelcomeComponent } from './welcome/components/welcome.component';


@NgModule({
  imports:      [
    BrowserModule ,
    RouterModule.forRoot([
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'welcome',
        component: WelcomeComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    RegistrationComponent,
    WelcomeComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {
  constructor() {}
}
