self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('flexion-challenge-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/script.js',
                '/styles.css',
                '/icon-192.png',
                '/icon-512.png'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
