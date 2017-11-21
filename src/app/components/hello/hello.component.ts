import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'hello',
    template: require('./hello.component.html')
})
export class HelloComponent {
    public hello = 'Hello';
    public blank = 'World';

    constructor(private route: ActivatedRoute) {
        route.params.subscribe(params => {
            this.blank = params['id'];
        });
    }

    public onKey(inputStr: string) {
        this.blank = inputStr;
    }
}
