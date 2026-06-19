const CACHE = 'rumo-v3';
const SHELL = [
  './index.html', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png'
];
self.addEventListener('install', ev => {
  ev.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', ev => {
  const url = new URL(ev.request.url);
  if(url.hostname !== self.location.hostname) return;
  ev.respondWith(
    caches.match(ev.request).then(cached => cached || fetch(ev.request).then(res => {
      if(res && res.status === 200){
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(ev.request, clone));
      }
      return res;
    }))
  );
});
