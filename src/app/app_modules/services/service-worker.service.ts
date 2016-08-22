import {Injectable} from '@angular/core';

@Injectable()
export class ServiceWorkerService {
    public worker: any;
    private subscribtions: any = {};

    constructor() {
    }

    setWorker(worker: any) {
        if (!worker) {
            throw new Error('No Worker!');
        }

        this.worker = worker;

        this.worker.addEventListener('message', (ev: any) => {
            if (ev.data && ev.data.command && this.subscribtions[ev.data.command]) {
                this.subscribtions[ev.data.command].forEach((func: Function) => func(ev.data, ev));
            }
        });

        this.worker.controller.addEventListener('statechange', function() {
            console.log(`\t\t${this.state}`);
        });
    }

    subscribe(key: string, worker: Function) {
        this.subscribtions[key] = this.subscribtions[key] || [];
        this.subscribtions[key].push(worker);
    }

    req(request: any) {
        return new Promise((resolve: Function, reject: Function) => {
            this.worker.controller.postMessage(request);
        });
    }

    cache(path: string) {
        return this.req({
            command : 'cache',
            path
        });
    }
}
