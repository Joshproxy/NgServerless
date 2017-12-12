import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../configuration.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpBaseService } from '../shared/httpbase.service';
import { CognitoAuth } from 'amazon-cognito-auth-js/dist/amazon-cognito-auth';

@Injectable()
export class AuthenticationService {

    private cogAuth;

    constructor(configurationService: ConfigurationService) {
        this.cogAuth = new CognitoAuth(configurationService.cognitoAuthData);
    }

    get authenticated(): boolean {
        return this.cogAuth.getCachedSession().isValid();
    }

    get accessToken(): string {
        return this.cogAuth.getCachedSession().getIdToken().getJwtToken();
    }

    authenticate = (callback: (authenticated: boolean) => void, tryCodeLogin: boolean = true) => {
        if (tryCodeLogin) {
            this.authenticateViaLogin()
                .then(callback, this.authenticationError);
        } else {
            this.authenticateViaStore()
                .then(callback, this.authenticationError);
        }
    }

    private authenticationError = (err) => {
        alert(err);
    }

    /// Sets up the cognito authorization handlers.
    /// Resolve will return authorization boolean.
    private setCogAuthHandlers = (resolve: (b: boolean) => void, reject: () => void) => {
        this.cogAuth.userhandler = {
            onSuccess: function (result) {
                resolve(true);
            },
            onFailure: function (err) {
                reject();
            }
        };
    }

    /// Try to authenticate via code on query string
    private authenticateViaLogin = (): Promise<boolean> => new Promise((resolve, reject) => {
        this.setCogAuthHandlers(resolve, reject);

        this.cogAuth.useCodeGrantFlow();
        this.cogAuth
            .parseCognitoWebResponse(window.location.href);
    })

    /// Try to authenticate by refreshing local data.
    private authenticateViaStore = (): Promise<boolean> => new Promise((resolve, reject) => {

        this.setCogAuthHandlers(resolve, reject);

        this.cogAuth.getSession();
    })
}

interface IUserData {
    userId: string;
    expiration: string;
    name: string;
    email: string;
    token: string;
}
