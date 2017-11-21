import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../configuration.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpBaseService {
    protected urlEnpoint = '';

    constructor(private http: HttpClient, endpoint: string) {
        this.urlEnpoint = endpoint;
    }

    private getAuthorizationHeaders = (token: string = null): HttpHeaders => {
        if (token == null) {
            token = sessionStorage['userToken'];
        }
        return new HttpHeaders().set('Authorization', token);
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
