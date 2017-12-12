import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../configuration.service';
import { HttpHeaders } from '@angular/common/http';
import { HttpBaseService } from '../shared/httpbase.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserInfoService extends HttpBaseService {

    constructor(http: HttpClient, configurationService: ConfigurationService, authService: AuthenticationService) {
        super(http, authService, configurationService.userInfoUrl);

    }

    getUserData = (useCache: boolean = false): Promise<IUserData> => {
        if (useCache) {
            let userData = null;
            try {
                userData = JSON.parse(sessionStorage['userData']);
            } catch (err) {
                userData = null;
            }
            if (userData != null) {
                return Promise.resolve(userData);
            }
        }

        return this.httpGet()
            .then((data: IUserData) => {
                if (data.userId !== '') {
                    sessionStorage['userData'] = JSON.stringify(data);
                }
                return data;
            });
    }
}

interface IUserData {
    userId: string;
    expiration: string;
    name: string;
    email: string;
    token: string;
}
