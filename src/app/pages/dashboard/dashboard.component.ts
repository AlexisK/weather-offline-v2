import {Component} from '@angular/core';
import {StateService} from 'services';


class FormPackage {
    constructor(
        public text: string = ''
    ) {}
}


@Component({
    selector    : 'sw-page-dashboard',
    templateUrl : './dashboard.component.html',
    styleUrls   : ['./dashboard.component.scss']
})

export class DashboardPageComponent {
    private data: FormPackage = new FormPackage();

    constructor(public state: StateService) {
    }

    submitMessage(ev?: any) {
        ev.preventDefault();
        console.log(ev, this.data);
    }
}

export const route = {path : '', component : DashboardPageComponent};



