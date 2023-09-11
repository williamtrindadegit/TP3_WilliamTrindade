/*
<!--PWA Service Worker-->
<!--Par: William John Adam Trindade-->
<!--2023-09-11-->
*/

//Update cache names any time any of the cached files change.
const CACHE_NAME = "static-cache-v12";
//Add list of files to cache here.
const FILES_TO_CACHE = [
  "contact.html",
  "cuillete.html",
  "index.html",
  "livres.html",
  "style/css/contact.css",
  "style/css/contact.css.map",
  "style/css/cuillete.css",
  "style/css/cuillete.css.map",
  "style/css/index.css",
  "style/css/index.css.map",
  "style/css/livres.css",
  "style/css/livres.css.map",
  "js/contact.js",
  "assets/img/favicon/favicon.ico",
  "assets/img/favicon/favicon.png",
  "assets/img/favicon/favicon16.png",
  "assets/img/favicon/favicon24.png",
  "assets/img/favicon/favicon32.png",
  "assets/img/mycologie/banniere1.jpg",
  "assets/img/mycologie/card1.jpg",
  "assets/img/mycologie/card2.jpg",
  "assets/img/mycologie/card3.jpg",
  "assets/img/mycologie/carrousel1.jpg",
  "assets/img/mycologie/carrousel2.jpg",
  "assets/img/mycologie/carrousel3.jpg",
  "assets/img/mycologie/carrousel4.jpg",
  "assets/img/mycologie/carroussel2.jpg",
  "assets/img/mycologie/champingons.webp",
  "assets/img/mycologie/chiox_0.jpg",
  "assets/img/mycologie/classification.jpeg",
  "assets/img/mycologie/classification2.jpg",
  "assets/img/mycologie/couverture_champignons_culture_biopterre_-2.jpg",
  "assets/img/mycologie/csq-couverture-complete.jpg",
  "assets/img/mycologie/cuillete.jpg",
  "assets/img/mycologie/cuillete2.jpg",
  "assets/img/mycologie/images (4).jpg",
  "assets/img/mycologie/index1.jpg",
  "assets/img/mycologie/index2.jpg",
  "assets/img/mycologie/livre_1.jpg",
  "assets/img/mycologie/livre_2.jpg",
  "assets/img/mycologie/livre_3.jpg",
  "assets/img/mycologie/livre_4.jpg",
  "assets/img/mycologie/livre1.jpg",
  "assets/img/mycologie/livre2.jpg",
  "assets/img/mycologie/mushroom-collage-01.jpg",
  "assets/img/mycologie/qsst.png",
  "assets/img/mushroom-icon_16.png",
  "assets/img/mushroom-icon_24.png",
  "assets/img/mushroom-icon_32.png",
  "assets/img/mushroom-icon_48.png",
  "assets/img/mushroom-icon_64.png",
  "assets/img/mushroom-icon_72.png",
  "assets/img/mushroom-icon_96.png",
  "assets/img/mushroom-icon_128.png",
  "assets/img/mushroom-icon_144.png",
  "assets/img/mushroom-icon_192.png",
  "assets/img/mushroom-icon_512.png"
];
self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");
  // Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Pre-caching offline page");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});
//Update cache names any time any of the cached files change.

self.addEventListener("activate", (evt) => {
  console.log("[ServiceWorker] Activate");
  //Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});
self.addEventListener("fetch", (evt) => {
  console.log("[ServiceWorker] Fetch", evt.request.url);
  //Add fetch event handler here.
  if (evt.request.mode !== "navigate") {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
    fetch(evt.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match("offline.html");
      });
    })
  );
});
