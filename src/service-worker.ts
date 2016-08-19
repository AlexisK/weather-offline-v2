const cacheName = 'weather-offline-cache-v2-1';

const filesToCache: string[] = [
    '/'
];

const pathToCache: string[] = [
    'https://query.yahooapis.com'
];

const fetched: any      = [];
let _fetchInterval: any = null;


let caches = self['caches'];
let fetch  = self['fetch'];


// Startup
self.addEventListener('install', function (ev: any) {
    console.log('[ServiceWorker] Install');
    ev.waitUntil(
        caches.open(cacheName).then(function (cache: any) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (ev: any) {
    console.log('[ServiceWorker] Activate');
    ev.waitUntil(
        caches.keys().then(function (keyList: string[]) {
            return Promise.all(keyList.map(function (key: string) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});


// Fetching requests
self.addEventListener('fetch', function (ev: any) {

    ev.respondWith(
        caches.match(ev.request).then(function (response: any) {
            if (response) {
                return response;
            }

            logFetched(ev.request.url);
            return fetch(ev.request).then((resp: any) => {
                pathToCache.forEach(path => {
                    if (ev.request.url.indexOf(path) === 0) {
                        caches.open(cacheName).then((cache: any) => {
                            cache.put(ev.request, resp.clone());
                            return resp;
                        });
                    }
                });
            });
        })
    );
});

function logFetched(url: string) {
    fetched.push(url);
    clearInterval(_fetchInterval);
    _fetchInterval = setTimeout(_logFetched, 300);
}

function _logFetched() {
    console.log('[ServiceWorker] Need to fetch:\n', fetched.join('\n'), '\n');
    fetched.length = 0;
}


// Handling [client -> service worker -> client] messages
const handlers = {
    'echo'  : function (req: any, resp: any, ev: any) {
        console.log('[ServiceWorker] Echo', ev);
    },
    'cache' : function (req: any, resp: any, ev: any) {
        console.log(ev);
        caches.open(cacheName).then((cache: any) => {
            cache.add(req.path);
        });
    }
};


self.addEventListener('message', function (ev: any) {

    if (ev.data.constructor === Object) {
        if (ev.data.command && handlers[ev.data.command]) {
            handlers[ev.data.command](ev.data, ev.source, ev);
        } else {
            // TBD
        }
    }

    console.log('[ServiceWorker] message', ev.data);
});
