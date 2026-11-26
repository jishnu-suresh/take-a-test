// the student page works offline after the first visit: the newest copy from the web, or the saved one
const C = "bee-take-a-test";
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(C).then(c => c.add("./"))); });
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok && e.request.mode === "navigate") caches.open(C).then(c => c.put("./", r.clone())); return r; })
    .catch(() => caches.match(e.request.mode === "navigate" ? "./" : e.request).then(r => r || Response.error())));
});
