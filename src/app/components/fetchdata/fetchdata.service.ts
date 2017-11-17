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

@Injectable()
export class FetchDataService {

    private fetchUrl: string = null;
    private cache: WeatherForecast[] = [];

    constructor(private http: HttpClient,
        @Inject('ORIGIN_URL') originUrl: string) {
        // The originUrl param must be injected for server-side pre-compilation
        // Without it, this would work if navigated to client-side, but would fail
        // if it were the first component pre-compiled on the server.
        //this.fetchUrl = originUrl + '/api/SampleData/WeatherForecasts';
        this.fetchUrl = 'https://mvhzp27oli.execute-api.us-east-2.amazonaws.com/test/sampleweather';
    }

    fetchDataObservable = (useCache: boolean = false): Observable<WeatherForecast[]> => {
        if (useCache && this.cache.length > 0) {
            return Observable.of(this.cache);
            //return Observable.from(this.cache);
        } else {
            return this.http
                .get(this.fetchUrl)
                .map(this.extractData)
                .catch(this.handleError);
        }
    }

    fetchDataPromise = (useCache: boolean = false): Promise<WeatherForecast[]> => {
        if (useCache && this.cache.length > 0) {
            return Promise.resolve(this.cache);
        }
        return this.http
            .get<ISampleWeather>(this.fetchUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    getData = (id: number): Promise<WeatherForecast> => {
        return <Promise<WeatherForecast>>this.http
            .get<IGetWeather>(this.fetchUrl, { params: { "id": id.toString() } })
            .toPromise()
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
        var iWeatherForecast = forecast.toIWeatherForecast();
        this.http
            .put(this.fetchUrl, iWeatherForecast)
            .toPromise()
            .then();
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
        var iWeather = <IWeatherForecast>{
            DataId: this.id,
            Summary: this.summary,
            Date: this.dateFormatted,
            TempC: this.temperatureC,
            TempF: this.temperatureF
        }
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
    Item: IWeatherForecast
}

interface ISampleWeather {
    Items: IWeatherForecast[],
    Count: number;
    ScannedCount: number;
}

// {"Items":[{"Date":"11/11/2017","TempC":17.77,"DataId":3,"Summary":"Sunny and cool","TempF":64},"Count":3,"ScannedCount":3