import { NgModule } from '@angular/core';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { rootRoutingModule } from './app.routes';
import { FetchDataService } from './components/fetchdata/fetchdata.service';
import { ConfigurationService } from './configuration.service';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthGuardService } from './authentication/authguard.service';
import { HttpBaseService } from './shared/httpbase.service';
import { UserInfoService } from './authentication/userInfo.service';

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
        HttpBaseService,
        FetchDataService,
        ConfigurationService,
        AuthenticationService,
        AuthGuardService,
        UserInfoService
    ]
};
