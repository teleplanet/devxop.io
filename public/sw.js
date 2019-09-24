'use strict';

/* eslint-disable max-len */

const applicationServerPublicKey = 'BA477LIzpRITyZ83BaNVX5mjUOiNok2p0Kt9k7elV8sjmtro_kfwpcdVcD5JxVEGNyW5-P1QRny2n-K4GGodSi0';

/* eslint-enable max-len */

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

self.addEventListener('message', event => {
    if (!event.data) {
        return;
    }

    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});



self.addEventListener('push', function (event) {
    console.log(event.data.text());



    let data = event.data.text();

    data = JSON.parse(data);

    //console.log('[Service Worker] Push Received.');
    //console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    let title = data.company["name"] + " (Pager " + data.pager + ")";
    let options = {
        body: "Your virtual pager has been called! Please return to the appropriate location.",
        icon: "images/pager.png",
        badge: "images/pager.png",
        data: {
            endpoint: data.company.endpoint,
        }
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
    console.log('[Service Worker] Notification click Received.');

    let data = event.data.text();

    data = JSON.parse(data);

    event.notification.close();

    event.waitUntil(clients.openWindow('https://devxop.com/' + data["endpoint"]));
});

self.addEventListener('pushsubscriptionchange', function (event) {
    console.log('[Service Worker]: \'pushsguk9ubscriptionchange\' event fired.');
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    event.waitUntil(
        self.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
            .then(function (newSubscription) {
                // TODO: Send to application server
                console.log('[Service Worker] New subscription: ', newSubscription);
            })
    );
});
