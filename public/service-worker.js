var cachesData = 'groww_assignment'
var dynamicCacheName = 'groww_assignment_dynamic'

self.addEventListener('install', function (event) {
    console.log('Service Worker Installed');
    event.waitUntil(
        caches.open(cachesData).then((cache) => {
            cache.addAll([
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
                './favicon.ico',
                './manifest.json',
                './index.html',
                './'
            ])
        })
    )
})
self.addEventListener('activate', event => {
    console.log('Service Worker Activated');
    event.waitUntil(
        caches.open(dynamicCacheName).then(cache => {
            cache.keys().then(function(cacheNames) {
                return Promise.all(
                    cacheNames.map(function(cacheName) {
                        console.log(cacheName);
                        if (cacheName) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            });
        })
    )
})

const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
};


self.addEventListener('fetch', function (evt) {
    if (navigator.onLine) {
        evt.respondWith(
            caches.match(evt.request).then((resp) => {
                return resp || fetch(evt.request).then(fetchRes => {
                    return caches.open(dynamicCacheName).then(cache => {
                        cache.put(evt.request.url, fetchRes.clone());
                        limitCacheSize(dynamicCacheName, 100);
                        return fetchRes;
                    })
                });
            })
        );
    }
})