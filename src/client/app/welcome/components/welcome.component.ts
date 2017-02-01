import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'tate-welcome',
    moduleId: module.id,
    templateUrl: 'welcome.template.html',
    styleUrls: ['welcome.component.css']
})
export class WelcomeComponent  {
    constructor(public router: Router) {
    }

    play() {
        this.router.navigate(['play']);
    }
}

