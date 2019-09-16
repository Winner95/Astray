var CACHE_NAME = 'maze-astray';

var urlsToCache = [
    '/',
    '/dist/main.js',
    '/textures/brick.jpg',
    '/textures/floor.jpg',
    '/textures/wood.jpg',
    '/manifest.json',
];

self.addEventListener('install', event => {
    event.waitUntil(
        (async function() {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(urlsToCache);
        })()
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        (async function() {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames
                    .filter(cacheName => {
                        // Return true if you want to remove this cache,
                        // but remember that caches are shared across
                        // the whole origin
                    })
                    .map(cacheName => caches.delete(cacheName))
            );
        })()
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        (async function() {
            const response = await caches.match(event.request);
            return response || fetch(event.request);
        })()
    );
});
