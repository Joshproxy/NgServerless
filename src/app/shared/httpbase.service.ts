import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../configuration.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class HttpBaseService {
    protected urlEnpoint = '';

    constructor(private http: HttpClient, private authService: AuthenticationService, endpoint: string) {
        this.urlEnpoint = endpoint;
    }

    private getAuthorizationHeaders = (): HttpHeaders => {
        return new HttpHeaders().set('Authorization', this.authService.accessToken);
    }

    protected httpGet = (): Promise<any> => {
        return this.http
            .get(this.urlEnpoint,
                { headers: this.getAuthorizationHeaders() })
            .toPromise();
    }

    protected httpPut = (body: any): Promise<any> => {
        return this.http
            .post(this.urlEnpoint, body)
            .toPromise();
    }
}
