import {Component} from '@angular/core';
import '../public/css/styles.css';

@Component({
    selector    : 'sw-app',
    templateUrl : './app.component.html',
    styleUrls   : ['./app.component.scss']
})
export class AppComponent {
    constructor() {
        if ('serviceWorker' in navigator) {
            navigator['serviceWorker'].register('./js/service-worker.js');
        }
    }
}
