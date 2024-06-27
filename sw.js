const CACHE_VERSION = 'v1';
const CACHE_NAME = `MC-${CACHE_VERSION}`;
const appShellFiles = [
  "classes.js",
  "classes.js.map",
  "favicon.png",
  "index.html",
  "manifest.json",
  "sw.js",
  "jquery.min.js",
  "assets.epk",
  "/lang/",
  "/build/",
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      // 指定されたファイルをキャッシュに追加する
      return cache.addAll(appShellFiles);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          // このスコープに所属していて且つCACHE_NAMEではないキャッシュを探す
          return cacheName.startsWith('MC-') && cacheName !== CACHE_NAME;
        }).map((cacheName) => {
          // いらないキャッシュを削除する
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      if (response) {
        return response;
      }

      let fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        let responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
