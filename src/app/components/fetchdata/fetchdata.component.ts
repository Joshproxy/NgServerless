import { Component } from '@angular/core';
import { FetchDataService, IWeatherForecast, WeatherForecast } from './fetchdata.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'fetchdata',
    template: require('./fetchdata.component.html'),
    styleUrls: ['./fetchdata.component.css']
})
export class FetchDataComponent {
    // Promise params
    public forecastsPromise: WeatherForecast[] = [];

    constructor(private dataService: FetchDataService) {
        this.loadSingle();
    }

    loadSingle = () => {
        this.dataService
            .getData()
            .then((weatherForecast: WeatherForecast) => {
                this.forecastsPromise.push(weatherForecast);
            });
    }

    createWeather = () => {
        const n = Math.floor(Math.random() * 100) + 1;
        const d = new Date(Date.now().valueOf());
        d.setDate(d.getDate() + n);
        const forecast = new WeatherForecast();
        forecast.id = n;
        forecast.dateFormatted = d.toLocaleDateString();
        forecast.temperatureF = n;
        forecast.temperatureC = 0;
        forecast.summary = 'Random weather today';

        this.forecastsPromise.push(forecast);
        this.dataService.insertData(forecast);
    }
}
