import { Component } from '@angular/core';
import { FetchDataService, IWeatherForecast, WeatherForecast } from './fetchdata.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';

@Component({
    selector: 'fetchdata',
    template: require('./fetchdata.component.html'),
    styleUrls: ['./fetchdata.component.css']
})
export class FetchDataComponent {
    // Promise params
    public forecastsPromise: WeatherForecast[] = [];
    public forecastsPromiseAsnyc: Promise<WeatherForecast[]> = new Promise(() => []);

    // Observable params
    public forecastsObservable: WeatherForecast[] = [];
    public forecastsObservableAsnyc: Observable<WeatherForecast[]>;

    constructor(private dataService: FetchDataService) {
        this.loadData(true);
    }

    loadDataViaPromise = (useCache: boolean = false) => {

        // Async promise
        this.forecastsPromiseAsnyc = this.dataService.fetchDataPromise(useCache);

        // Promise
        this.dataService.fetchDataPromise(useCache)
            .then((data: WeatherForecast[]) => {
                this.forecastsPromise = data;
            });
    };

    loadDataViaObservable = (useCache: boolean = false) => {
        // Async Observable
        this.forecastsObservableAsnyc = this.dataService.fetchDataObservable(useCache);

        // Observable
        this.dataService.fetchDataObservable(useCache)
            .subscribe((data: WeatherForecast[]) => {
                this.forecastsObservable = data;
            });

    };

    loadData = (useCache: boolean = false) => {
        this.loadDataViaPromise(useCache);
        this.loadDataViaObservable(useCache);
    };

    loadSingle = (weather: WeatherForecast) => {
        this.dataService
            .getData(weather.id)
            .then((weather: WeatherForecast) => {
                alert(JSON.stringify(weather));
            });
    }

    createWeather = () => {
        var n = Math.floor(Math.random() * 100) + 1;
        var d = new Date(Date.now().valueOf());
        d.setDate(d.getDate() + n);
        var forecast = new WeatherForecast();
        forecast.id = n;
        forecast.dateFormatted = d.toLocaleDateString();
        forecast.temperatureF = n;
        forecast.temperatureC = 0;
        forecast.summary = 'Random weather today';

        this.forecastsPromise.push(forecast);
        this.dataService.insertData(forecast);
    }
}
