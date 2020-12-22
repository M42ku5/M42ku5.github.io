const myPwaApp = "v1";
const assets = [
  "/seuche/",
  "/seuche/index.html",
  "/seuche/audio.mp3",
  "/seuche/images/icons-192.png",
  "/seuche/images/icons-512.png"
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
