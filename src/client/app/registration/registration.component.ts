import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../shared/loggin.service';

@Component({
    selector: 'tate-registration',
    moduleId: module.id,
    templateUrl: 'registration.template.html',
    styleUrls: ['registration.component.css']
})
export class RegistrationComponent  {
    username: string;

    constructor(private loginService: LoginService, private router: Router) {
    }

    register() {
        this.loginService.login(this.username)
          .then((success)=> this.router.navigate(['play']));
    }

}

