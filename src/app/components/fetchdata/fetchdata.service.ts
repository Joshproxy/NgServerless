import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ConfigurationService } from '../../configuration.service';
import { HttpBaseService } from '../../shared/httpbase.service';
import { AuthenticationService } from '../../authentication/authentication.service';

@Injectable()
export class FetchDataService extends HttpBaseService {

    private fetchUrl: string = null;
    private cache: WeatherForecast[] = [];

    constructor(http: HttpClient, private configurationService: ConfigurationService,
        authenticationService: AuthenticationService,
        @Inject('ORIGIN_URL') originUrl: string) {
        // The originUrl param must be injected for server-side pre-compilation
        // Without it, this would work if navigated to client-side, but would fail
        // if it were the first component pre-compiled on the server.
        // this.fetchUrl = originUrl + '/api/SampleData/WeatherForecasts';
        super(http, authenticationService, configurationService.fetchUrl);
    }

    getData = (): Promise<WeatherForecast> => {
        return <Promise<WeatherForecast>>this.httpGet()
            .then(this.extractSingleData)
            .catch(this.handleError);
    }

    private extractData = (data: ISampleWeather) => {
        this.cache = data.Items.map(i => new WeatherForecast(i));
        return this.cache;
    }

    private extractSingleData = (data: IGetWeather) => {
        return new WeatherForecast(data.Item);
    }

    private handleError = (err: any) => {
        window.alert('Error getting weather');
        return [];
    }

    insertData = (forecast: WeatherForecast) => {
        const iWeatherForecast = forecast.toIWeatherForecast();
        this.httpPut(iWeatherForecast);
    }
}


export class WeatherForecast {
    public id: number;
    public dateFormatted: string;
    public temperatureC: number;
    public temperatureF: number;
    public summary: string;
    constructor(iWeather: IWeatherForecast = null) {
        if (iWeather != null) {
            this.id = iWeather.DataId;
            this.dateFormatted = iWeather.Date;
            this.temperatureC = iWeather.TempC;
            this.temperatureF = iWeather.TempF;
            this.summary = iWeather.Summary;
        }
    }

    public toIWeatherForecast = () => {
        const iWeather = <IWeatherForecast>{
            DataId: this.id,
            Summary: this.summary,
            Date: this.dateFormatted,
            TempC: this.temperatureC,
            TempF: this.temperatureF
        };
        return iWeather;
    }
}

export interface IWeatherForecast {
    DataId: number;
    Date: string;
    TempC: number;
    TempF: number;
    Summary: string;
}

interface IGetWeather {
    Item: IWeatherForecast;
}

interface ISampleWeather {
    Items: IWeatherForecast[];
    Count: number;
    ScannedCount: number;
}

// {"Items":[{"Date":"11/11/2017","TempC":17.77,"DataId":3,"Summary":"Sunny and cool","TempF":64},"Count":3,"ScannedCount":3
