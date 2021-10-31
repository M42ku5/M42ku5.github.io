const myPwaApp = "v1";
const assets = [
  "/notes/",
  "/notes/index.html",
  "/notes/scripts.min.js",
  "/notes/images/icon-192.png",
  "/notes/images/icon-512.png"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(myPwaApp).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
