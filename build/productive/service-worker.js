var cacheVersion="v0.0.1";self.addEventListener("install",e=>{e.waitUntil(caches.open(cacheVersion).then(e=>e.addAll(["/","/index.html","/service-worker.js?"+cacheVersion,"/css/style.css?"+cacheVersion,"/css/style-dark.css?"+cacheVersion,"/js/scripts.js?"+cacheVersion])))}),self.addEventListener("activate",e=>{e.waitUntil((async()=>{return(await caches.keys()).map(async e=>{if(e!==cacheVersion)return console.log("Service Worker: Cache Version "+e+" wurde entfernt"),caches.delete(e)})})())}),self.addEventListener("message",e=>{"SKIP_WAITING"===e.data&&self.skipWaiting()});