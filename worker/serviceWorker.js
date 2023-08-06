self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
});

self.addEventListener('message', async (event) => {
    if (event.data && event.data.image) {
        console.log('Received image in Service Worker. Storing in Cache...');
        const base64data = "data:image/jpeg;base64," + event.data.image;
        const cache = await caches.open('image-cache');
        const response = new Response(base64data);
        cache.put('uploaded-image', response);
        console.log('Image stored in Cache.');
    } else {
        console.log('No image data received in Service Worker');
    }
});
