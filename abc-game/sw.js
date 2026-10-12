// Service worker for ABC Game: makes the game work offline.
// Strategy: answer from the cache immediately and refresh the cache in the background,
// so page updates arrive on the next start. Bump CACHE only when the file list changes.
const CACHE = 'abc-game-v1';
const FILES = [
    './',
    './manifest.webmanifest',
    './icons/icon-192.png',
    './icons/icon-512.png'
];
const SCOPE = new URL('./', self.registration.scope);

self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
    event.waitUntil(caches.keys()
        .then(keys => Promise.all(keys
            .filter(key => key.startsWith('abc-game-') && key !== CACHE)
            .map(key => caches.delete(key))))
        .then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    if (url.origin !== SCOPE.origin || !url.pathname.startsWith(SCOPE.pathname)) return;

    // The page is stored once, whatever the query (e.g. ?debug)
    const isPage = req.mode === 'navigate' || url.pathname === SCOPE.pathname ||
        url.pathname === SCOPE.pathname + 'index.html';
    const key = isPage ? SCOPE.href : url.origin + url.pathname;

    event.respondWith(caches.open(CACHE).then(async cache => {
        const cached = await cache.match(key);
        const network = fetch(req).then(res => {
            if (res.ok) cache.put(key, res.clone());
            return res;
        });
        if (cached) {
            event.waitUntil(network.catch(() => {}));
            return cached;
        }
        return network;
    }));
});
