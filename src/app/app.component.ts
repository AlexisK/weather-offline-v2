import {Component, ViewEncapsulation} from '@angular/core';
import '../public/css/styles.css';

import {StateService} from 'services';
import {
    NavbarComponent,
    LoaderScreenComponent,
    IcoPrefetchComponent,
    IcoComponent,
    WeatherWidgetComponent
} from 'components';

@Component({
    selector      : 'sw-app',
    templateUrl   : './app.component.html',
    styleUrls     : ['./app_modules/styles/general.scss', './app.component.scss'],
    providers     : [StateService],
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
    constructor(private state: StateService) {
        // if ('serviceWorker' in navigator) {
        //     navigator['serviceWorker'].register('./js/service-worker.js');
        // }

        state.isLoaded = true;
    }
}
