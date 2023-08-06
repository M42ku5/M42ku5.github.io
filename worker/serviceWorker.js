// Use a library or helper for IndexedDB operations
const dbVersion = 1;
const dbName = 'ImageDB';

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onerror = event => {
            console.error("Error opening DB", event);
            reject("Error");
        };

        request.onsuccess = event => {
            resolve(event.target.result);
        };

        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('images')) {
                db.createObjectStore('images');
            }
        };
    });
}

self.addEventListener('message', async (event) => {
    if (event.data && event.data.image) {
        console.log('Received image in Service Worker. Storing in IndexedDB...');
        
        // Use the provided MIME type or default to JPEG if not available
        const base64data = "data:" + (event.data.type || "image/jpeg") + ";base64," + event.data.image;

        const db = await openDB();
        const transaction = db.transaction(['images'], 'readwrite');
        const store = transaction.objectStore('images');
        store.put(base64data, 'uploaded-image');

        transaction.oncomplete = function(event) {
            console.log('Image stored in IndexedDB.');
        };

        transaction.onerror = function(event) {
            console.error('Error storing image:', event);
        };
    } else {
        console.log('No image data received in Service Worker');
    }
});
