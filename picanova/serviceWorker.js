const myPwaApp = "v1";
const assets = [
  "/picanova/",
  "/picanova/index.html",
  "/picanova/styles.css",
  "/picanova/images/icon-192.png",
  "/picanova/images/icon-512.png",
  "/picanova/images/picanova_wallaper_1.jpg",
  "/picanova/images/picanova_wallaper_1_min.jpg",
  "/picanova/images/picanova_wallaper_2.jpg",
  "/picanova/images/picanova_wallaper_2_min.jpg",
  "/picanova/images/picanova_wallaper_3.jpg",
  "/picanova/images/picanova_wallaper_3_min.jpg",
  "/picanova/images/picanova_wallaper_4.png",
  "/picanova/images/picanova_wallaper_4_min.jpg"
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
