import { Component } from '@angular/core';

@Component({
    selector: 'multiplier',
    template: require('./multiplier.component.html')
})
export class MultiplierComponent {
    public current = 1;

    public doIt() {
        this.current = this.current * 2;
    }
}
