importScripts('https://unpkg.com/workbox-sw@0.0.2/build/importScripts/workbox-sw.dev.v0.0.2.js');
importScripts('https://unpkg.com/workbox-runtime-caching@1.3.0/build/importScripts/workbox-runtime-caching.prod.v1.3.0.js');
importScripts('https://unpkg.com/workbox-routing@1.3.0/build/importScripts/workbox-routing.prod.v1.3.0.js');

const assetRoute = new workbox.routing.RegExpRoute({
  regExp: new RegExp('^http://localhost:8081/jobs/static/*'),
  handler: new workbox.runtimeCaching.CacheFirst()
});

const router = new workbox.routing.Router();
router.registerRoutes({ routes: [assetRoute] });
router.setDefaultHandler({
  handler: new workbox.runtimeCaching.CacheFirst()
});

// // import * as fileNames from "./cache.js";
// const CACHE_LIST = ["/", "/socket.io/socket.io.js"];
// // const FILES_TO_SKIP = ["index.ejs", "sw.js", "cache.js", "pwa.js"];

// // fileNames.forEach(name => {
// //   const file = name.replaceAll("/", " ").split(" ");
// //   if (FILES_TO_SKIP.includes(file[file.length - 1])) return;
// //   CACHE_LIST.push(name.replace("views/", ""));
// // });

// const STATIC_CACHE_VERSION = `static-v1-${new Date().getTime()}`;

// self.addEventListener("install", function (event) {
//   const onSuccessCachesOpen = (cache) => {
//     return cache.addAll(CACHE_LIST);
//   }

//   event.waitUntil(
//     caches.open(STATIC_CACHE_VERSION).then(onSuccessCachesOpen)
//   );
// });

// self.addEventListener("activate", (event) => {
//   const onSuccessCachesKeys = (cacheNames) => {
//     return Promise.all(
//       cacheNames.map((cache) => {
//           if (cache !== STATIC_CACHE_VERSION) {
//             return caches.delete(cache)
//           }
//       })
//     )
//   }

//   event.waitUntil(caches.keys().then(onSuccessCachesKeys));
// });

// self.addEventListener("fetch", (event) => {
//   const FALLBACK_URL = CACHE_LIST[0];

//   const onSuccessFetch = response => {
//     if (CACHE_LIST.includes(new URL(event.request.url).pathname)) return response
//       const onSuccessDynamicCacheOpen = cache => {
//       cache.put(event.request.url, response.clone())
//       return response
//     }

//     return caches
//     .open(STATIC_CACHE_VERSION)
//     .then(onSuccessDynamicCacheOpen)
//     .catch(() => caches.match(FALLBACK_URL))
//   }

//   const onErrorFetch = () => {
//     const onSuccessCacheMatch = response => {
//       if (response) return response
//       else return caches.match(FALLBACK_URL)
//     }

//     return caches.match(event.request).then(onSuccessCacheMatch)
//   }

//   event.respondWith(
//     fetch(event.request)
//     .then(onSuccessFetch)
//     .catch(onErrorFetch)
//   );
// });