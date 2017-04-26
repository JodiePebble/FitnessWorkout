var BASE_PATH = '/FitnessWorkout/';
var CACHE_NAME = 'gih-cache-v1';
var CACHED_URLS = [
    BASE_PATH + 'create.html',
    BASE_PATH + 'homeWokrkout.html',
    BASE_PATH + 'gymWorkout.html',
    BASE_PATH + 'worko.html',
    BASE_PATH + 'settings.html',
    BASE_PATH + 'styles/style.css',
    BASE_PATH + 'scripts/mdl/material.min.css',
    BASE_PATH + 'scripts/mdl/material.min.js',
    BASE_PATH + 'scripts/mdl/bower.json',
    BASE_PATH + 'scripts/mdl/package.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('second.html');
        }
      });
    })
  );
});
