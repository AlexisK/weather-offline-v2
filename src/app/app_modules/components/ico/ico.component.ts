import {Component, Input} from '@angular/core';


@Component({
    selector    : '[ico]',
    templateUrl : './ico.component.html',
    styleUrls   : ['./ico.component.scss']
})

export class IcoComponent {
    @Input('ico') ico: string;

    constructor() {
    }
}
