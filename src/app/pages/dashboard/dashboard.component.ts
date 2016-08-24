import {Component} from '@angular/core';
import {StateService} from 'services';
import {ServiceWorkerService} from "services";


class FormPackage {
    constructor(public command: string = 'displayNotiication',
                public title: string = '',
                public text: string = '') {
    }
}


@Component({
    selector    : 'sw-page-dashboard',
    templateUrl : './dashboard.component.html',
    styleUrls   : ['./dashboard.component.scss']
})

export class DashboardPageComponent {
    private data: FormPackage = new FormPackage();

    constructor(public state: StateService,
                private serviceWorker: ServiceWorkerService) {
    }

    submitMessage(ev?: any) {
        ev.preventDefault();
        console.log(ev, this.data);
        this.serviceWorker.req(this.data);
    }
}

export const route = {path : '', component : DashboardPageComponent};



