var BASE_PATH = '/FitnessWorkout/';
var CACHE_NAME = 'gih-cache-v1';
var CACHED_URLS = [
    BASE_PATH + 'create.html',
    BASE_PATH + 'homeWorkout.html',
    BASE_PATH + 'gymWorkout.html',
    BASE_PATH + 'workout1.html',
    BASE_PATH + 'settings.html',
    BASE_PATH + 'second.html',
    BASE_PATH + 'data.JSON',
    BASE_PATH + 'styles/style.css',
    BASE_PATH + 'scripts/mdl/material.min.css',
    BASE_PATH + 'scripts/mdl/material.min.js',
    BASE_PATH + 'scripts/mdl/bower.json',
    BASE_PATH + 'scripts/mdl/package.json',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    "https://code.getmdl.io/1.3.0/material.light_blue-pink.min.css";
];
var googleMapsAPIJS = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD6wSjjoqU7OoY5FBBYx9eZuXAV7WLO4iU&callback=initMap';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

self.addEventListener('fetch', function(event) {
  var requestURL = new URL(event.request.url);
  // Handle requests for index.html
  if (requestURL.pathname === BASE_PATH + 'index.html') {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match('index.html').then(function(cachedResponse) {
          var fetchPromise = fetch('index.html').then(function(networkResponse) {
            cache.put('index.html', networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
      
  } else if (requestURL.pathname === BASE_PATH + 'second.html') {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match('second.html').then(function(cachedResponse) {
          var fetchPromise = fetch('second.html').then(function(networkResponse) {
            cache.put('second.html', networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
//    } else if (requestURL.pathname === BASE_PATH + 'second.html') {
//        event.respondWith(
//          caches.open(CACHE_NAME).then(function(cache) {
//            return cache.match('second.html').then(function(cachedResponse) {
//              var fetchPromise = fetch('second.html').then(function(networkResponse) {
//                cache.put('second.html', networkResponse.clone());
//                return networkResponse;
//              });
//              return cachedResponse || fetchPromise;
//            });
//          })
//        );
//
//    // Handle requests for Google Maps JavaScript API file
//    } else if (requestURL.href === googleMapsAPIJS) {
//        event.respondWith(
//          fetch(
//            googleMapsAPIJS+'&'+Date.now(),
//            { mode: 'no-cors', cache: 'no-store' }
//          ).catch(function() {
//            return caches.match('offline-map.js');
//          })
//        );
//    } else if (
//        CACHED_URLS.includes(requestURL.href) ||
//        CACHED_URLS.includes(requestURL.pathname)
//    ) {
//    event.respondWith(
//      caches.open(CACHE_NAME).then(function(cache) {
//        return cache.match(event.request).then(function(response) {
//          return response || fetch(event.request);
//        });
//      })
//    );
//  }
}});