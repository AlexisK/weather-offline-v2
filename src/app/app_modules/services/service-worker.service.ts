import {Injectable} from '@angular/core';

@Injectable()
export class ServiceWorkerService {
    public worker: any;
    private subscribtions: any = {};

    constructor() {
    }

    setWorker(worker: any) {
        return new Promise((resolve, reject) => {
            if (!worker) {
                throw new Error('No Worker!');
            }

            this.worker = worker;

            if (!this.worker.controller) {
                window.location.reload();
            }

            this.worker.addEventListener('message', (ev: any) => {
                if (ev.data && ev.data.command && this.subscribtions[ev.data.command]) {
                    this.subscribtions[ev.data.command].forEach((func: Function) => func(ev.data, ev));
                }
            });

            this.worker.addEventListener('controllerchange', (ev: any) => {
                alert('controllerchange');
                this.worker.controller.addEventListener('statechange', function () {
                    alert('statechange');
                    console.log(`\t\t[${this.state}]`);
                });
            });


            resolve();
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
