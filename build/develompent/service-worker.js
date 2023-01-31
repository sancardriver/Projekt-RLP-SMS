// Cache Version
var cacheVersion = 'v0.0.2RC3';

self.addEventListener('install', event => {
    // Cache anlegen
    event.waitUntil(
        caches.open(cacheVersion)
        .then(cache => cache.addAll([
            '/',
            '/index.html',
            '/favicon.ico',
            '/service-worker.js?' + cacheVersion,
            '/css/style.css?' + cacheVersion,
            '/css/style-dark.css?' + cacheVersion,
            '/js/scripts.js?' + cacheVersion,
            '/icon.png',
            '/img/logo/projekt_rlp-sms.svg',
            '/fonts/lato-v23-latin-ext_latin-100.eot',
            '/fonts/lato-v23-latin-ext_latin-100.svg',
            '/fonts/lato-v23-latin-ext_latin-100.ttf',
            '/fonts/lato-v23-latin-ext_latin-100.woff',
            '/fonts/lato-v23-latin-ext_latin-100.woff2',
            '/fonts/lato-v23-latin-ext_latin-100italic.eot',
            '/fonts/lato-v23-latin-ext_latin-100italic.svg',
            '/fonts/lato-v23-latin-ext_latin-100italic.ttf',
            '/fonts/lato-v23-latin-ext_latin-100italic.woff',
            '/fonts/lato-v23-latin-ext_latin-100italic.woff2',
            '/fonts/lato-v23-latin-ext_latin-300.eot',
            '/fonts/lato-v23-latin-ext_latin-300.svg',
            '/fonts/lato-v23-latin-ext_latin-300.ttf',
            '/fonts/lato-v23-latin-ext_latin-300.woff',
            '/fonts/lato-v23-latin-ext_latin-300.woff2',
            '/fonts/lato-v23-latin-ext_latin-300italic.eot',
            '/fonts/lato-v23-latin-ext_latin-300italic.svg',
            '/fonts/lato-v23-latin-ext_latin-300italic.ttf',
            '/fonts/lato-v23-latin-ext_latin-300italic.woff',
            '/fonts/lato-v23-latin-ext_latin-300italic.woff2',
            '/fonts/lato-v23-latin-ext_latin-700.eot',
            '/fonts/lato-v23-latin-ext_latin-700.svg',
            '/fonts/lato-v23-latin-ext_latin-700.ttf',
            '/fonts/lato-v23-latin-ext_latin-700.woff',
            '/fonts/lato-v23-latin-ext_latin-700.woff2',
            '/fonts/lato-v23-latin-ext_latin-700italic.eot',
            '/fonts/lato-v23-latin-ext_latin-700italic.svg',
            '/fonts/lato-v23-latin-ext_latin-700italic.ttf',
            '/fonts/lato-v23-latin-ext_latin-700italic.woff',
            '/fonts/lato-v23-latin-ext_latin-700italic.woff2',
            '/fonts/lato-v23-latin-ext_latin-900.eot',
            '/fonts/lato-v23-latin-ext_latin-900.svg',
            '/fonts/lato-v23-latin-ext_latin-900.ttf',
            '/fonts/lato-v23-latin-ext_latin-900.woff',
            '/fonts/lato-v23-latin-ext_latin-900.woff2',
            '/fonts/lato-v23-latin-ext_latin-900italic.eot',
            '/fonts/lato-v23-latin-ext_latin-900italic.svg',
            '/fonts/lato-v23-latin-ext_latin-900italic.ttf',
            '/fonts/lato-v23-latin-ext_latin-900italic.woff',
            '/fonts/lato-v23-latin-ext_latin-900italic.woff2',
            '/fonts/lato-v23-latin-ext_latin-italic.eot',
            '/fonts/lato-v23-latin-ext_latin-italic.svg',
            '/fonts/lato-v23-latin-ext_latin-italic.ttf',
            '/fonts/lato-v23-latin-ext_latin-italic.woff',
            '/fonts/lato-v23-latin-ext_latin-italic.woff2',
            '/fonts/lato-v23-latin-ext_latin-regular.eot',
            '/fonts/lato-v23-latin-ext_latin-regular.svg',
            '/fonts/lato-v23-latin-ext_latin-regular.ttf',
            '/fonts/lato-v23-latin-ext_latin-regular.woff',
            '/fonts/lato-v23-latin-ext_latin-regular.woff2'
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