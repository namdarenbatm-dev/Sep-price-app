/* Service Worker — سامانه تصمیم‌یار سپ
 * استراتژی: Cache-first برای شل اپ، Network-first برای فونت‌های خارجی
 * سازگار با Safari (iOS 16.4+) و Chrome/Edge
 */
const CACHE = 'sep-dss-v2';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/icon-180.png',
  './icons/logo-sep.png',
  './icons/logo-sep-full.png',

];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(SHELL);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; }).map(function (k) {
          return caches.delete(k);
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // فقط همان origin و فونت‌های گوگل
  const isSameOrigin = url.origin === self.location.origin;
  const isGoogleFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';

  if (!isSameOrigin && !isGoogleFont) return;

  event.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;

      return fetch(req).then(function (res) {
        // فقط پاسخ‌های موفق را کش کن
        if (!res || res.status !== 200 || res.type === 'opaque' && !isGoogleFont) {
          return res;
        }
        const clone = res.clone();
        caches.open(CACHE).then(function (cache) {
          cache.put(req, clone);
        });
        return res;
      }).catch(function () {
        // آفلاین: اگر index درخواست شده، از کش برگردان
        if (req.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return cached;
      });
    })
  );
});
