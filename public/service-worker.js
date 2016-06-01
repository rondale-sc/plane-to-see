var staticCacheName = 'plane-to-see-v1';

self.oninstall = function(event) {
  self.skipWaiting();

  var c1 = caches.open(staticCacheName).then(function(cache) {
    return cache.addAll([
      './',
      'assets/vendor.js',
      'assets/sw-planes.js',
      'assets/vendor.css',
      'assets/sw-planes.css',
      'assets/images/logo.svg'
    ]);
  });

  event.waitUntil(c1);
};

self.onfetch = function(event){
  var requestURL = new URL(event.request.url);
  event.respondWith(stashOrFetch(event.request));
}

function stashOrFetch(request) {
  return caches.match(request).then(function(response){
    if (response) { return response; }

    return fetch(request).then(function(response){
      caches.open('planes-data').then(function(cache) {
        cache.put(request, response);
      });

      return response.clone();
    });
  });
}
