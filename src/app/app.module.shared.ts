import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { rootRoutingModule } from './app.routes';
import { FetchDataService } from './components/fetchdata/fetchdata.service';

export const sharedConfig: NgModule = {
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        FetchDataComponent,
        HomeComponent
    ],
    imports: [
        rootRoutingModule
    ], 
    providers: [
        FetchDataService
    ]
};
