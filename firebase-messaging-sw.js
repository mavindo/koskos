/* Firebase Cloud Messaging Service Worker
 * Place this file at /firebase-messaging-sw.js (root scope)
 * It shows background notifications and deduplicates via notif_id.
 */

/* eslint-disable no-undef */
importScripts('/firebase-config.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.4/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.4/firebase-messaging-compat.js');

// Fill with your Firebase web config (public) or load from another script.
// You can also generate this at build time.
const firebaseConfig = {
  apiKey: self.FIREBASE_API_KEY || '<YOUR_API_KEY>',
  authDomain: self.FIREBASE_AUTH_DOMAIN || '<YOUR_AUTH_DOMAIN>',
  projectId: self.FIREBASE_PROJECT_ID || '<YOUR_PROJECT_ID>',
  storageBucket: self.FIREBASE_STORAGE_BUCKET || '<YOUR_STORAGE_BUCKET>',
  messagingSenderId: self.FIREBASE_MESSAGING_SENDER_ID || '<YOUR_SENDER_ID>',
  appId: self.FIREBASE_APP_ID || '<YOUR_APP_ID>',
  measurementId: self.FIREBASE_MEASUREMENT_ID || '<YOUR_MEASUREMENT_ID>'
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// In-memory dedupe for this SW instance
const seen = new Set();

function show(payload) {
  const data = payload && payload.data ? payload.data : {};
  const title = data.title || (payload.notification && payload.notification.title) || 'Notification';
  const body = data.body || (payload.notification && payload.notification.body) || '';
  const notifId = data.notif_id || '';
  const notifType = parseInt(data.notif_type || '1', 10);

  if (notifId && seen.has(notifId)) {
    // Drop duplicates
    return Promise.resolve();
  }
  if (notifId) seen.add(notifId);

  /**
   * type mapping:
   * 1: device_notification (default)
   * 2: alert (requireInteraction)
   * 3: snackbar (silent)
   * 4: modal (demand attention)
   */
  const requireInteraction = notifType === 2 || notifType === 4;

  const options = {
    body,
    tag: notifId || undefined, // allow replacement
    renotify: true,
    requireInteraction,
    data: { notif_id: notifId, notif_type: notifType },
    icon: '/icons/Icon-192.png',
    badge: '/icons/Icon-192.png',
  };
  return self.registration.showNotification(title, options);
}

// Background messages (Compat API)
if (messaging && messaging.onBackgroundMessage) {
  messaging.onBackgroundMessage(function(payload) {
    return show(payload);
  });
}

// Notification click handler for deep-linking
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  // Optionally focus an open client or open a new one
  event.waitUntil((async () => {
    const allClients = await self.clients.matchAll({ includeUncontrolled: true, type: 'window' });
    if (allClients && allClients.length) {
      const client = allClients[0];
      client.focus();
    } else {
      await self.clients.openWindow('/');
    }
  })());
});
