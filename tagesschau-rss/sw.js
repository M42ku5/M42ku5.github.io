const myPwaApp = "v2022.05.05-0";
const assets = [
  "/tagesschau-rss/",
  "/tagesschau-rss/index.html",
  "/tagesschau-rss/script.js",
  "/tagesschau-rss/toggle.js",
  "/tagesschau-rss/images/icon-192.png",
  "/tagesschau-rss/images/icon-192-maskable.png",
  "/tagesschau-rss/images/icon-512.png"
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
    caches.match(fetchEvent.request)
    .then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
