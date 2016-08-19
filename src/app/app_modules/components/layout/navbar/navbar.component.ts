import {Component, ViewEncapsulation} from '@angular/core';


@Component({
    selector      : 'sw-navbar',
    templateUrl   : './navbar.component.html',
    styleUrls     : ['./navbar.component.scss'],
    encapsulation : ViewEncapsulation.None
})

export class NavbarComponent {
    private focusState: boolean = false;

    constructor() {
    }

    setFocusState(state: boolean) {
        this.focusState = state;
    }
}
