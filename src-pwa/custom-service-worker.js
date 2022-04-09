/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';

self.skipWaiting();
clientsClaim();

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST);

cleanupOutdatedCaches();

// Non-SSR fallback to index.html
// Production SSR fallback to offline.html (except for dev)
if (process.env.MODE !== 'ssr' || process.env.PROD) {
	registerRoute(
		new NavigationRoute(createHandlerBoundToURL(process.env.PWA_FALLBACK_HTML), {
			denylist: [/sw\.js$/, /workbox-(.)*\.js$/],
		})
	);
}

self.addEventListener('push', (event) => {
	if (event.data) {
		const data = JSON.parse(event.data.text());
		const { title, ...body } = data;
		event.waitUntil(self.registration.showNotification(title, body));
	}
});

self.addEventListener('notificationclick', (event) => {
	event.waitUntil(
		clients.matchAll().then((clis) => {
			const clientUsingApp = clis.find((cli) => cli.visibilityState === 'visible');

			if (clientUsingApp) {
				clientUsingApp.navigate(notification.data.openUrl);
				clientUsingApp.focus();
			} else {
				clients.openWindow(notification.data.openUrl);
			}
		})
	);
});
