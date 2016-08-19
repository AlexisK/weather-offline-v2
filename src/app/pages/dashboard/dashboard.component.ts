import {Component} from '@angular/core';
import {StateService} from 'services';


@Component({
    selector    : 'sw-page-dashboard',
    templateUrl : './dashboard.component.html',
    styleUrls   : ['./dashboard.component.scss']
})

export class DashboardComponent {
    constructor(public state: StateService) {
    }
}

export const route = {path : '', component : DashboardComponent};



