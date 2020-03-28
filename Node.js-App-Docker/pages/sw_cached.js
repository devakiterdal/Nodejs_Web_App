const cacheName = 'ver2';

const cachAssets = [
    'index.html',
    '/js/app.js'
]

self.addEventListener('install', (event) => {
    console.log('Service Worker : Installed');

    // event.waitUntill(
    //     caches.open(cacheName)
    //     .then(cache => {
    //         console.log('Service Worker : Caching Files');
    //         cache.addAll(cachAssets);
    //     })
    //     .then(() => self.skipWaiting())
    // );

});

self.addEventListener('activate', (event) => {
    console.log('Service Worker : Activated');
    //Remove unwantewd caches
    event.waitUntil(
        caches.keys().then(cachesNames => {
            return Promise.all(
                cacheName.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker : Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', event => {
    console.log('Service Worker : Fetching');
    event.respondWith(
        fetch(event.request)
        .then(res => {
            //make copy/clone of response
            const resClone = res.clone();

            caches
                .open(cacheName)
                .then(cache => {
                    cache.put(event.request, resClone);
                });
            return res;
        }).catch(err => caches.match(event.request)
            .then(res => res)
        )
    );
});