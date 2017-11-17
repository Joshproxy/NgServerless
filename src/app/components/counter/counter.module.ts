import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CounterComponent } from './counter.component';
import { CounterMenuComponent } from './countermenu/countermenu.component';
import { HelloComponent } from '../hello/hello.component';
import { MultiplierComponent } from '../multiplier/multiplier.component';
import { FormsModule } from '@angular/forms';

@NgModule(
    {
        declarations: [
            CounterComponent,
            CounterMenuComponent,
            HelloComponent,
            MultiplierComponent
        ],
        imports: [
            RouterModule.forChild([
                {
                    path: '', component: CounterComponent, children: [
                        { path: '', redirectTo: 'multiplier', pathMatch: 'full' },
                        { path: 'hello/:id', component: HelloComponent },
                        { path: 'multiplier', component: MultiplierComponent }
                    ]
                }
            ]),
            FormsModule
        ]
    }
)
export class CounterModule {
}
