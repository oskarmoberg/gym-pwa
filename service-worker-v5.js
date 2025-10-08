// Minimal, robust multi-page cache
const CACHE = 'gymlogger-v5';
const ASSETS = [
  './',
  './index.html',
  './exercises.html',
  './export.html',
  './dashboard.html',
  './app.css',
  './nav.js',
  './manifest.webmanifest'
];

self.addEventListener('install', (e)=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});

self.addEventListener('activate', (e)=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=> self.clients.claim())
  );
});

self.addEventListener('fetch', (e)=>{
  // Cache-first på allt; funkar bra för PWA där du ofta är offline
  e.respondWith(
    caches.match(e.request).then(r=> r || fetch(e.request).catch(()=>{
      // Om offline och HTML-navigering saknas i cache → visa index
      if (e.request.mode === 'navigate') return caches.match('./index.html');
    }))
  );
});
