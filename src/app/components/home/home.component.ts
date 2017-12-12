import { Component } from '@angular/core';
import { UserInfoService } from '../../authentication/userInfo.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'home',
    template: require('./home.component.html')
})
export class HomeComponent {

    public username = 'Username not found';

    constructor(private userInfoService: UserInfoService) {
        this.userInfoService
            .getUserData()
            .then(userData => this.username = userData.name);
    }
}
