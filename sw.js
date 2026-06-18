const CACHE = 'rumo-v2';
const SHELL = [
  './index.html', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png',
  './audio/inspira.mp3', './audio/expira.mp3',
  './audio/scan_0.mp3', './audio/scan_1.mp3',
  './audio/scan_2.mp3', './audio/scan_3.mp3',
  './audio/scan_4.mp3', './audio/scan_5.mp3',
  './audio/scan_6.mp3', './audio/scan_7.mp3',
  './audio/scan_8.mp3', './audio/scan_9.mp3',
  './audio/scan_10.mp3'
];

self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
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
  if (url.hostname !== self.location.hostname) return;
  ev.respondWith(
    caches.match(ev.request).then(cached => {
      if (cached) return cached;
      return fetch(ev.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(ev.request, clone));
        }
        return res;
      });
    })
  );
});
