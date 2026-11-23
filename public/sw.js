const CACHE='topiclock-shell-v1-1';
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.add('./')))});
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key!==CACHE)await caches.delete(key);await self.clients.claim()})()));
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==location.origin)return;event.respondWith((async()=>{const cached=await caches.match(req);try{const response=await fetch(req);if(response.ok){const cache=await caches.open(CACHE);cache.put(req,response.clone())}return response}catch{return cached||caches.match('./')}})())});
