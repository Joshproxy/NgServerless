import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterModule } from './components/counter/counter.module';

export function loadCounterModule() {
  return CounterModule;
}

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'counter', loadChildren: loadCounterModule },
    { path: 'fetch-data', component: FetchDataComponent },
    { path: '**', redirectTo: 'home' }
];

export const rootRoutingModule = RouterModule.forRoot(routes);
