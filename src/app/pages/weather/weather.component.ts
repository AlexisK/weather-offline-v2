import {Component} from '@angular/core';
import {StateService} from 'services';

export const places = ['Kiev, UA', 'Tokyo, JP'];

@Component({
    selector    : 'sw-page-weather',
    templateUrl : './weather.component.html',
    styleUrls   : ['./weather.component.scss']
})

export class WeatherPageComponent {
    private places = places;

    constructor(public state: StateService) {
    }
}

export const route = {path : 'weather', component : WeatherPageComponent};




