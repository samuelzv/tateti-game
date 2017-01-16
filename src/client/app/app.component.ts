import { Component } from '@angular/core';

@Component({
  selector: 'tateti-app',
  template: `<h1>Hello {{name}}</h1>
  <a routerLink="/registration">Registration</a>
  <a routerLink="/welcome">Welcome</a>
  <router-outlet></router-outlet>
  `,
})
export class AppComponent  {
  name = 'Angular';
  constructor() {}
}
