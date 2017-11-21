import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../configuration.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpBaseService } from '../shared/httpbase.service';

@Injectable()
export class AuthenticationService extends HttpBaseService {
    private loginExpirationDate: Date = new Date();


    constructor(http: HttpClient, configurationService: ConfigurationService) {
        super(http, configurationService.userInfoUrl);
    }

    getUserData = (): Promise<IUserData> => {
        if (!this.authenticated()) {
            return this.httpGet()
                .then((data: IUserData) => {
                    sessionStorage['userData'] = JSON.stringify(data);
                    this.loginExpirationDate = new Date(data.expiration);
                    return data;
                });
        } else {
            return Promise.resolve(JSON.parse(sessionStorage['userData']));
        }
    }

    authenticated = (): boolean => {
        if (sessionStorage['userData']) {
            if (this.loginExpirationDate.getTime() > Date.now()) {
                return true;
            }
        }
        return false;
    }

    authenticate = (token: string): Promise<boolean> => {
        if (token) {
            sessionStorage['userToken'] = token;
            return this.getUserData()
                .then(userData => {
                    return this.authenticated();
                });
        } else {
            return Promise.resolve(false);
        }
    }
}

interface IUserData {
    userId: string;
    expiration: string;
    name: string;
    email: string;
    token: string;
}
