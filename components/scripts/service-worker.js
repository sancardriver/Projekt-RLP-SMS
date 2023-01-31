// Cache Version
var cacheVersion = 'v0.0.1';

self.addEventListener('install', event => {
    // Cache anlegen
    event.waitUntil(
        caches.open(cacheVersion)
        .then(cache => cache.addAll([
            '/',
            '/index.html',
            '/service-worker.js?' + cacheVersion,
            '/css/style.css?' + cacheVersion,
            '/css/style-dark.css?' + cacheVersion,
            '/js/scripts.js?' + cacheVersion,
        ]))
    );
});

self.addEventListener('activate', event => {
    // Alten Cache entfernen
    event.waitUntil(
        (async () => {
            const keys = await caches.keys();
            return keys.map(async (cache) => {
                if (cache !== cacheVersion) {
                    console.log('Service Worker: Cache Version ' + cache + ' wurde entfernt');
                    return await caches.delete(cache);
                }
            })
        })()
    )
})

self.addEventListener('message', (event) => {
    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});