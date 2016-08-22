import {Component} from '@angular/core';
import {StateService} from 'services';


@Component({
    selector    : 'sw-page-dashboard',
    templateUrl : './dashboard.component.html',
    styleUrls   : ['./dashboard.component.scss']
})

export class DashboardPageComponent {
    constructor(public state: StateService) {
    }
}

export const route = {path : '', component : DashboardPageComponent};



