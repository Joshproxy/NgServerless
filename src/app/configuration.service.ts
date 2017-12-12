import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';

@Injectable()
export class ConfigurationService {
    public fetchUrl = 'https://mvhzp27oli.execute-api.us-east-2.amazonaws.com/test/sampleweather';
    public userInfoUrl = 'https://mvhzp27oli.execute-api.us-east-2.amazonaws.com/test/getuserinfo';
    // tslint:disable-next-line:max-line-length
    public loginUrl = 'https://questertest.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=5hhfahjjvnn1qcpmgfhp1sbskq&redirect_uri=https%3A%2F%2Flocalhost%3A4200';

    public cognitoAuthData = {
        ClientId: '5hhfahjjvnn1qcpmgfhp1sbskq', // Your client id here
        AppWebDomain: 'questertest.auth.us-east-2.amazoncognito.com',
        TokenScopesArray: ['profile', 'email', 'openid', 'aws.cognito.signin.user.admin'],
        RedirectUriSignIn: 'https://localhost:4200',
        RedirectUriSignOut: 'https://localhost:4200'
    };
}

