importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

workbox.setConfig({
    debug: true
});


workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    workbox.strategies.cacheFirst({
        cacheName: 'image-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 1000,
                maxAgeSeconds: 7 * 24 * 60 * 60,
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
        ],
    })
);

workbox.routing.registerRoute(
    // Cache API Request
    new RegExp('/json/(.*)'),
    workbox.strategies.staleWhileRevalidate({
         cacheName: 'json-cache',
         plugins : [
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 60 // 30 Minutes
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
        ]
    })
);



workbox.skipWaiting();
workbox.clientsClaim();
