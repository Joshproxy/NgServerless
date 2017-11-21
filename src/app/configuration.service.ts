import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';

@Injectable()
export class ConfigurationService {
    public fetchUrl = 'https://mvhzp27oli.execute-api.us-east-2.amazonaws.com/test/sampleweather';
    public userInfoUrl = 'https://mvhzp27oli.execute-api.us-east-2.amazonaws.com/test/getuserinfo';
    // tslint:disable-next-line:max-line-length
    public loginUrl = 'https://questertest.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=7i7bebn98l6cijfg92dovu6okg&redirect_uri=https%3A%2F%2Fd2jv6h66sp2gsw.cloudfront.net%2Findex.html';
}

