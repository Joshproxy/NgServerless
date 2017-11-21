import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'home',
    template: require('./home.component.html')
})
export class HomeComponent {

    public username = 'Username not found';

    constructor(private authenticationService: AuthenticationService) {
        this.authenticationService
            .getUserData()
            .then(userData => this.username = userData.name);
    }
}
