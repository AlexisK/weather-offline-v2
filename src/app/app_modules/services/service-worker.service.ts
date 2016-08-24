import {Injectable} from '@angular/core';

@Injectable()
export class ServiceWorkerService {
    public registration: any;
    public worker: any;
    private notificationsKey: string;
    private subscribtions: any = {};

    constructor() {
    }

    register(url: string) {
        return Promise.all([
            navigator['serviceWorker'].register(url, {scope : '.'})
                .then((registration: any) => {
                    this.registration = registration;

                    registration.pushManager.subscribe({
                        userVisibleOnly : true
                    }).then((sub: any) => {
                        this.notificationsKey = sub.endpoint.split('/').slice(-1)[0];

                        console.log(`curl\
                        --header "Authorization: key=AIzaSyCANL3FhIup5iX-R1lZlKIr2Z61yLzI6TQ"\
                        --header "Content-Type: application/json"\
                        https://android.googleapis.com/gcm/send\
                        -d '${JSON.stringify({
                            registration_ids : [this.notificationsKey]
                        })}'`);
                    });
                }),
            this.setWorker(navigator['serviceWorker'])
        ]);
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

    sendNotification(message: string) {

    }
}
