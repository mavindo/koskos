'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "d336f5d25f5513687ccc90b803a664ef",
"version.json": "d8e525886f7d32889b47c1e1e81ceac0",
"index.html": "1208dd5ecccf5beec9cbd358d05caddc",
"/": "1208dd5ecccf5beec9cbd358d05caddc",
"midtrans/pay.html": "7b5dd04e354987539b15dd76b065e561",
"firebase-messaging-sw.js": "21d95ba410c3b09b727024211b56560b",
"main.dart.js": "09f1f02f885fc7cfdf144e4987ad07a1",
"payment/finish.html": "5d7d2978f6b3cf747643bdc1ce2f9402",
"_docs/TROUBLESHOOTING_BLANK_SCREEN.md": "f54289f399b75c9b6dc13c0a52df45d7",
"_docs/index.html": "6df261eaf4bce8f3c380dc52d1950cb8",
"_docs/emergency_rollback.sh": "755ba5db1ee877a4242bf522575f71b1",
"_docs/NGINX_404_FIX.md": "2c6526d3c82a810ec3b7ab3d5853e202",
"_docs/nginx-kosandcost.conf": "44a11558661d10b8340b3541ae0b53a0",
"_docs/README.md": "82aa32a319217877dbc1f6d11d7e8c8f",
"_docs/BUILD_DEPLOY_GUIDE.md": "6b2ec22783d0900791fb4ef5b716f6e3",
"_docs/WEB_LOADING_OPTIMIZATION.md": "5b771f6133c077a51c2ff9d79130c953",
"_docs/deploy.sh": "ab7474f8b6d1de927394d025f11e8362",
"_docs/minimal_fix.sh": "8dcab81deea1564e4503982b9ea1c7be",
"_docs/QUICK_FIX.md": "17935a26d726f9d5c99611636970b380",
"404.html": "f98326013589fe46f97812141409ec32",
"flutter.js": "888483df48293866f9f41d3d9274a779",
"favicon.png": "e1f99b1dae3913562bc2e1f9702991bc",
"icons/Icon-192.png": "4e7cd73084886f46a61de9f0a06f6537",
"icons/Icon-maskable-192.png": "4e7cd73084886f46a61de9f0a06f6537",
"icons/Icon-maskable-512.png": "2a8f52c5d93da658f75529f0fba20507",
"icons/Icon-512.png": "2a8f52c5d93da658f75529f0fba20507",
"manifest.json": "1f15b586e7f08fa877123da48b26c705",
"firebase-config.js": "68bdb3247d0c900974caf06489b9e915",
"assets/AssetManifest.json": "a39efbc2ceb76bb3a2467f07555235bb",
"assets/NOTICES": "f957939f375f564c985e18cebb27b898",
"assets/FontManifest.json": "371b4e6d5b6fd835650a538ffb39955e",
"assets/AssetManifest.bin.json": "e2444315b24115917994ef37952d5dd6",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/packages/flutter_map/lib/assets/flutter_map_logo.png": "208d63cc917af9713fc9572bd5c09362",
"assets/packages/font_awesome_flutter/lib/fonts/Font-Awesome-7-Free-Regular-400.otf": "57ae2d63e075e3d9cec6cd56ebe04193",
"assets/packages/font_awesome_flutter/lib/fonts/Font-Awesome-7-Brands-Regular-400.otf": "d40c67ce9f52d4bf087e61453006393c",
"assets/packages/font_awesome_flutter/lib/fonts/Font-Awesome-7-Free-Solid-900.otf": "a085ba01df2e6a482f0d470efbf65346",
"assets/packages/m_toast/assets/images/error.png": "09f839c4c15e739c3e1c5c99b3f04288",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "6508e371ba2fa4aba26949952ec5f182",
"assets/fonts/MaterialIcons-Regular.otf": "923a86922cf9b755c277fec17fa08f2d",
"assets/assets/hotel/meikles.jpg": "fe98632ecec44ea22639295e38e3ae9e",
"assets/assets/hotel/bronte.jpg": "a9c6b6189f3da49dd9ec517b12f2a201",
"assets/assets/hotel/hotel_booking.png": "89f1fbbdc7d80e4a6292622d7f929690",
"assets/assets/hotel/hotel_1.png": "a9ae40f2bd59b4e56bc3d6ddd98768a5",
"assets/assets/hotel/hotel_2.png": "1303973de1c8e2226a34b770aaa50fb0",
"assets/assets/hotel/cresta.jpg": "42c96d0676e5c1aef67f5bf1c8d9648b",
"assets/assets/hotel/hotel_3.png": "2f6ae1319a610cea2b8bb86c6c789e9b",
"assets/assets/hotel/hotel_4.png": "d5a6dfd83f984b2b8d5e408e74018412",
"assets/assets/hotel/hotel_5.png": "ee2a764f889388f9e60a981028fe1e91",
"assets/assets/hotel/rainbow.jpg": "2a7ec548eb2ffa0aa5766aef951c75c0",
"assets/assets/images/kos_and_cost.png": "e9b3beff310a3200973e22ac9f85a86e",
"assets/assets/images/userImage.png": "afc26cb27789a846c7047e57cb9c6422",
"assets/assets/images/feedbackImage.png": "5f8e9064f54cf51a70fee2da78a5b014",
"assets/assets/images/inviteImage.png": "4d337cf829c67258aa3aae385f5ec31c",
"assets/assets/images/supportIcon.png": "2eb21b9823a538c996ec667e17388322",
"assets/assets/images/home_chat.json": "fbe9b4a39943838e1c1f3ac708aa600c",
"assets/assets/images/helpImage.png": "2bff0fc93675d32f89db50f2d3e2a5b1",
"assets/assets/images/home.json": "d108ecc766ff24263aafe29409d7769c",
"assets/assets/fitness_app/fitness_app.png": "bd55b7dc68210a0a5e6fa9341a47dbaf",
"assets/assets/fitness_app/bell.png": "929723572aa737a354244ca14fe5659b",
"assets/assets/fitness_app/tab_4s.png": "40c45bbb7601c039da61be3e3c0f7520",
"assets/assets/fitness_app/tab_3s.png": "a9093dcadf7724797ee22a5a802da7ad",
"assets/assets/fitness_app/tab_1.png": "629111ba46f6559071bcf25d2859a7ad",
"assets/assets/fitness_app/tab_3.png": "2a8f733675e2d8a7c6e9ac67a535bbf2",
"assets/assets/fitness_app/tab_2.png": "6506b7480618968b3daee97570927f65",
"assets/assets/fitness_app/burned.png": "2ffad4b8dff525e57473142f0265b6bd",
"assets/assets/fitness_app/area1.png": "9cbfec64c29ec6821547f1c5093f38b7",
"assets/assets/fitness_app/bottle.png": "840d3c89291f9d3b0a859d7479c10d0c",
"assets/assets/fitness_app/area3.png": "e85a8d2207edfb0325369d93982fba03",
"assets/assets/fitness_app/area2.png": "2863c486c15808e8f105ccac2febfdbc",
"assets/assets/fitness_app/dinner.png": "d61779f47b560d09b0df15b346323ac4",
"assets/assets/fitness_app/tab_4.png": "f679006d5a49884f9ae89628d1d62d88",
"assets/assets/fitness_app/tab_2s.png": "d270e94953ae9b7f377c5b253345374d",
"assets/assets/fitness_app/tab_1s.png": "fbd3aa5ed884a724f0435521586f6585",
"assets/assets/fitness_app/snack.png": "14a3e91c7a517b0a2f71dbcd86d2104d",
"assets/assets/fitness_app/lunch.png": "6855159f38835c1f03289b102a2e8b52",
"assets/assets/fitness_app/glass.png": "266bca612c726abd6e481a4d890cef8e",
"assets/assets/fitness_app/breakfast.png": "1d2b0e6a7e46a44723131c663471f811",
"assets/assets/fitness_app/eaten.png": "3f7d6f5aea8996d15d52c4c2268abd45",
"assets/assets/fitness_app/back.png": "af6b0e6121d6eb48289cce3a3b8d8963",
"assets/assets/fitness_app/runner.png": "efb26bd46e91d305bda3b4b3c5a57c54",
"assets/assets/introduction_animation/introduction_image.png": "307c773d181ceeb899559add51c7acb4",
"assets/assets/introduction_animation/introduction_animation.png": "309f80cbbe9ba84d2d643677c7853907",
"assets/assets/introduction_animation/mood_dairy_image.png": "64172e2be2e435a8a002ee49d83d779b",
"assets/assets/introduction_animation/care_image.png": "9bf0ea738c1dcabf5650abea1c02e993",
"assets/assets/introduction_animation/relax_image.png": "750458c224fc63ede91b894cb893fb03",
"assets/assets/introduction_animation/welcome.png": "0b5447c747d72f631c7b92e12f26e2a1",
"assets/assets/fonts/WorkSans-Regular.ttf": "30be604d29fd477c201fb1d6e668eaeb",
"assets/assets/fonts/Roboto-Medium.ttf": "58aef543c97bbaf6a9896e8484456d98",
"assets/assets/fonts/Roboto-Regular.ttf": "11eabca2251325cfc5589c9c6fb57b46",
"assets/assets/fonts/WorkSans-Medium.ttf": "488b6f72b6183415e7a20aafa803a0c8",
"assets/assets/fonts/WorkSans-SemiBold.ttf": "6f8da6d25c25d58ef3ec1c8b7c0e69c3",
"assets/assets/fonts/Roboto-Bold.ttf": "e07df86cef2e721115583d61d1fb68a6",
"assets/assets/fonts/WorkSans-Bold.ttf": "1fed2d8028f8f5356cbecedb03427405",
"assets/assets/design_course/userImage.png": "f0f0f1fe2d13630b6eab4fc122df0879",
"assets/assets/design_course/design_course.png": "056917dfdf670a55361f3fde8efbfd8e",
"assets/assets/design_course/interFace1.png": "cd8a44e8d0af949a031c0ea83958d623",
"assets/assets/design_course/interFace3.png": "25e4c23657b1dac674e352d274ad8b2e",
"assets/assets/design_course/interFace2.png": "c101d35e907f00f40900fca7f9c4c69e",
"assets/assets/design_course/webInterFace.png": "3ac7805ba2cca78a43bcb0658b1098cd",
"assets/assets/design_course/interFace4.png": "aeaa1e1b0de05128ab97337e9a73c25c",
"favicon.svg": "c438fa2a1020848ccf6d6661a6c09e12",
"canvaskit/skwasm.js": "1ef3ea3a0fec4569e5d531da25f34095",
"canvaskit/skwasm_heavy.js": "413f5b2b2d9345f37de148e2544f584f",
"canvaskit/skwasm.js.symbols": "0088242d10d7e7d6d2649d1fe1bda7c1",
"canvaskit/canvaskit.js.symbols": "58832fbed59e00d2190aa295c4d70360",
"canvaskit/skwasm_heavy.js.symbols": "3c01ec03b5de6d62c34e17014d1decd3",
"canvaskit/skwasm.wasm": "264db41426307cfc7fa44b95a7772109",
"canvaskit/chromium/canvaskit.js.symbols": "193deaca1a1424049326d4a91ad1d88d",
"canvaskit/chromium/canvaskit.js": "5e27aae346eee469027c80af0751d53d",
"canvaskit/chromium/canvaskit.wasm": "24c77e750a7fa6d474198905249ff506",
"canvaskit/canvaskit.js": "140ccb7d34d0a55065fbd422b843add6",
"canvaskit/canvaskit.wasm": "07b9f5853202304d3b0749d9306573cc",
"canvaskit/skwasm_heavy.wasm": "8034ad26ba2485dab2fd49bdd786837b"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
