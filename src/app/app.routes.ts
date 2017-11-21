import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterModule } from './components/counter/counter.module';
import { AuthGuardService } from './authentication/authguard.service';

export function loadCounterModule() {
  return CounterModule;
}

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
    { path: 'counter', loadChildren: loadCounterModule },
    { path: 'fetch-data', component: FetchDataComponent, canActivate: [AuthGuardService] },
    { path: '**', redirectTo: 'home', canActivate: [AuthGuardService] }
];

export const rootRoutingModule = RouterModule.forRoot(routes);
