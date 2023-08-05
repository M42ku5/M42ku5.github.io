self.addEventListener('message', function(event) {
  console.log('Service Worker received a message', event.data);
  this.setInterval(() => {self.clients.matchAll().then(all => all.forEach(client => client.postMessage(event.data)));}, 1000);
});
