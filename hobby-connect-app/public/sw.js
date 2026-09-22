// Minimalny service worker — na razie tylko umożliwia instalację strony jako aplikacji.
// Cache'owanie na potrzeby trybu offline można dodać później.

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Na razie po prostu przepuszczamy wszystkie zapytania do sieci.
});
