const cacheName = 'pwa-crud-cache';
const filesToCache = [
    '/',
    '/index.html',
    '/app.js',
    '/style.css'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(filesToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
            .catch(error => {
                console.error('Error fetching resource:', error);
            })
    );
});