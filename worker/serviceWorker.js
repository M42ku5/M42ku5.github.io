let intervalID;

self.addEventListener('message', function(event) {
  console.log('Service Worker received a message', event.data);
  
  if (event.data === 'confirmation') {
    // Clear the interval if a confirmation message is received
    clearInterval(intervalID);
    console.log('Interval cleared');
    return;
  }
  
  intervalID = setInterval(() => {
    self.clients.matchAll().then(all => all.forEach(client => client.postMessage(event.data)));
  }, 1000);
});
