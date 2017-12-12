import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { ConfigurationService } from '../configuration.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthenticationService, private router: Router,
        private configurationService: ConfigurationService) { }

    canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
        debugger;
        if (route.queryParams.code !== undefined) {
            this.authService
                .authenticate(this.authenticationHandler, true);
        } else if (this.authService.authenticated) {
            return true;
        } else {
            this.authService
                .authenticate(this.authenticationHandler, false);
        }

        return false;
    }

    private authenticationHandler = (authenticated: boolean) => {
        if (authenticated) {
            this.router.navigate(['/home']);
        } else {
            window.location.href = this.configurationService.loginUrl;
        }
    }

    parseFragment = (fragmentWhole: string): any => {
        const parsedFragment: any = {};

        if (fragmentWhole) {
            const sections = fragmentWhole.split('&');
            sections.forEach(s => {
                const keyValuePair = s.split('=');
                const fragment = {};
                parsedFragment[keyValuePair[0]] = keyValuePair[1];
            });
        }
        return parsedFragment;
    }
}
