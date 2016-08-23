const cacheName = 'weather-offline-cache-v2-1';

const isDebug = false;
const debug   = function (str: string, args?: any, kwargs?: any) {
    if (isDebug) {
        console.log(new Date(), '[Service Worker]', str, Array.prototype.slice.call(arguments, 1));
    }
};

const filesToCache: string[] = [
    '/',
    'http://fonts.googleapis.com/css?family=Lato:300,400,400italic,700,700italic',
    '/js/polyfills.js',
    '/js/vendor.js',
    '/js/app.js'
];

const fetched: any      = [];
let _fetchInterval: any = null;


let caches = self['caches'];
let fetch  = self['fetch'];


//


// Startup
self.addEventListener('install', function (ev: any) {
    debug('Install');
    ev.waitUntil(
        caches.open(cacheName).then(function (cache: any) {
            debug('Caching app shell');
            return cache.addAll(filesToCache);
        }).then(() => {
            return self['skipWaiting']();
        })
    );
});

self.addEventListener('activate', function (ev: any) {
    debug('Activate');
    ev.waitUntil(caches.keys().then(function (keyList: string[]) {
        return Promise.all(keyList.map(function (key: string) {
            if (key !== cacheName) {
                debug('Removing old cache', key);
                return caches.delete(key);
            }
        }));
    }));

});


//


// Fetching XHR requests
self.addEventListener('fetch', function (ev: any) {

    ev.respondWith(
        caches.match(ev.request).then(function (response: any) {
            if (response) {
                return response;
            }

            logFetched(ev.request.url);
            return fetch(ev.request).then((resp: any) => {
                let respCopy = resp.clone();

                caches.open(cacheName).then((cache: any) => {
                    cache.put(ev.request, respCopy);

                });

                return resp;
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
    debug('Need to fetch:\n', fetched.join('\n'), '\n');
    fetched.length = 0;
}


//


// Handling [client -> service worker -> client] messages
const handlers = {
    'echo'  : function (req: any, resp: any, ev: any) {
        debug('Echo', ev);
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

    debug('message', ev.data);
});
