import {Injectable} from '@angular/core';

@Injectable()
export class StateService {
    public isLoaded: boolean = false;
    public isOnline: boolean = false;
}
