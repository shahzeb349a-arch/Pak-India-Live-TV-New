/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7b16fee0'], (function (workbox) { 'use strict';

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "da5f566048be1bf97e99b6abec282420"
  }, {
    "url": "pwa-512x512.png",
    "revision": "78079c39e486f8ed62cf729bba137d0d"
  }, {
    "url": "pwa-192x192.png",
    "revision": "860a1dc33cf953e640da4b8c391f0cbe"
  }, {
    "url": "index.html",
    "revision": "bd903c96aa0d6cb8bf71655343ac664b"
  }, {
    "url": "icon.svg",
    "revision": "2f020940638762caf53fb0b78e319534"
  }, {
    "url": "favicon.png",
    "revision": "88c78a82288eb41d772cd8fac6477db0"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "8294002a929d990e61ce5d302b0d69f5"
  }, {
    "url": "assets/index-DU5wZvCz.js",
    "revision": null
  }, {
    "url": "assets/index-8PIrQraL.css",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "8294002a929d990e61ce5d302b0d69f5"
  }, {
    "url": "favicon.png",
    "revision": "88c78a82288eb41d772cd8fac6477db0"
  }, {
    "url": "icon.svg",
    "revision": "2f020940638762caf53fb0b78e319534"
  }, {
    "url": "pwa-192x192.png",
    "revision": "860a1dc33cf953e640da4b8c391f0cbe"
  }, {
    "url": "pwa-512x512.png",
    "revision": "78079c39e486f8ed62cf729bba137d0d"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "da5f566048be1bf97e99b6abec282420"
  }, {
    "url": "manifest.webmanifest",
    "revision": "ffd62d1de297a275e950a24cb7a20e55"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
