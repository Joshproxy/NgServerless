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

    private userToken = '';

    constructor(private authService: AuthenticationService, private router: Router,
        private configurationService: ConfigurationService) { }

    canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
        const fragment = this.parseFragment(route.fragment);

        this.userToken = fragment.id_token;
        return this.checkLogin();
    }

    checkLogin = (): boolean => {
        if (this.authService.authenticated()) { return true; }

        this.authService
            .authenticate(this.userToken)
            .then(authenticated => {
                if (authenticated) {
                    this.router.navigate(['/home']);
                } else {
                    window.location.href = this.configurationService.loginUrl;
                }
            });

        return false;
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
