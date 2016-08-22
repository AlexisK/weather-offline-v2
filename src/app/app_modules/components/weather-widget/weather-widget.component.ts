import {Component, Input, AfterViewInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';


@Component({
    selector    : 'sw-weather-widget',
    templateUrl : './weather-widget.component.html',
    styleUrls   : ['./weather-widget.component.scss'],
    providers   : [WeatherService]
})

export class WeatherWidgetComponent implements AfterViewInit {
    @Input('place') place: string;
    private forecast: any;

    constructor(public weatherService: WeatherService) {
    }

    ngAfterViewInit() {
        this.weatherService.getForecast(this.place).then(forecast => this.forecast = forecast);
    }
}
