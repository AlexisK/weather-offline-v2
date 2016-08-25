import {Component} from '@angular/core';
import {StateService, ServiceWorkerService} from 'services';


class FormPackage {
    constructor(public command = 'displayNotiication',
                public title = '',
                public text = '') {
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



