import {Component, ViewEncapsulation} from '@angular/core';
import '../public/css/styles.css';

import {
    StateService,
    ServiceWorkerService,
    WeatherService
} from 'services';
import {
    NavbarComponent,
    LoaderScreenComponent,
    IcoPrefetchComponent,
    IcoComponent,
    WeatherWidgetComponent,
} from 'components';

import {places as weatherPlaces} from './pages/weather/weather.component';

@Component({
    selector      : 'sw-app',
    templateUrl   : './app.component.html',
    styleUrls     : ['./app_modules/styles/general.scss', './app.component.scss'],
    providers     : [],
    directives    : [
        NavbarComponent,
        LoaderScreenComponent,
        IcoPrefetchComponent,
        IcoComponent,
        WeatherWidgetComponent
    ],
    encapsulation : ViewEncapsulation.None
})
export class AppComponent {
    constructor(private state: StateService,
                private serviceWorker: ServiceWorkerService,
                private weatherService: WeatherService) {
        if ('serviceWorker' in navigator) {
            navigator['serviceWorker'].register('./service-worker.js');

            serviceWorker.setWorker(navigator['serviceWorker']);
            weatherService.precache(weatherPlaces);
        }

        state.isLoaded = true;
    }
}
