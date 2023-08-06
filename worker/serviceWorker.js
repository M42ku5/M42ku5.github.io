self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
});

self.addEventListener('message', async (event) => {
    if (event.data && event.data.image) {
        const cache = await caches.open('image-cache');
        const response = new Response(event.data.image, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Cache-Control': 'max-age=3600',
            },
        });
        cache.put('uploaded-image', response);
    }
});
