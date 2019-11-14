importScripts('/js/sw-utils.js');


const STATIC_CACHE = 'static-v6';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    '/',
    '/index.html',
    '/css/custom.css',
    '/css/fixes.css',
    // '/img/favicon.ico',
    '/js/app.js',
    '/js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://code.jquery.com/jquery-3.2.1.slim.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'
];


self.addEventListener('install', e => {
    const cacheStatic = caches.open(STATIC_CACHE).then(cache =>
        cache.addAll(APP_SHELL));

    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache =>
        cache.addAll(APP_SHELL_INMUTABLE));

    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
});

self.addEventListener('activate', e => {
    const respuesta = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }

            if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
                return caches.delete(key);
            }
        });
    });
    e.waitUntil(respuesta);
});


self.addEventListener('fetch', e => {
    const respuesta = caches.match(e.request).then(resp => {
        if (resp) {
            return resp;
        } else {
            return fetch(e.request).then(newResp => {
                return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newResp);
            });
        }
    });
    e.respondWith(respuesta);
});
