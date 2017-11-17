import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    private signInCode = '';

    constructor(private route: ActivatedRoute) {
        route
            .queryParamMap
            .subscribe(paramMap => {
                 this.signInCode = paramMap.get('code') || '';
                 alert(this.signInCode);
            });
        
        
        
        // route.queryParams.subscribe(params => {
        //     this.signInCode = params['code'];
        //     alert(this.signInCode);
        // })        
    }
}
