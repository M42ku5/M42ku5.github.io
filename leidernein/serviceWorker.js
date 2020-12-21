const myPwaApp = "v1";
const assets = [
  "/leidernein/",
  "/leidernein/index.html",
  "/leidernein/audio.ogg",
  "/leidernein/audio.mp3",
  "/leidernein/images/icons-192.png",
  "/leidernein/images/icons-512.png"
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
