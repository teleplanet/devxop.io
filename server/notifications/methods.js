const webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys = {
    publicKey:"BA477LIzpRITyZ83BaNVX5mjUOiNok2p0Kt9k7elV8sjmtro_kfwpcdVcD5JxVEGNyW5-P1QRny2n-K4GGodSi0",
    privateKey:"XShFUo4EmT3Rct5b6piiVs75_kjpXzQqiVgg2qxIlZg"
}//webpush.generateVAPIDKeys();

webpush.setGCMAPIKey('AIzaSyBAwc9rEdjtOfYBQy3jnoKtBD58R4K_3no');
webpush.setVapidDetails(
  'https://devxop.com/gsbistro',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// This is the same output of calling JSON.stringify on a PushSubscription
/* const pushSubscription = {
  endpoint: '.....',
  keys: {
    auth: '.....',
    p256dh: '.....'
  }
};
 */

Meteor.methods({
  'notifications.subscribe': function (sub) {
    PushNotifications.insert({
      payload: sub,
    });
  },
  'notifications.pagers': function () {

    let notifications = PushNotifications.find().fetch();

    for(let i = 0; i < notifications.length; i++){
      //console.log(notifications[i]);
      webpush.sendNotification(JSON.parse(notifications[i].payload), 'Your Push Payload Text');
    }
  },
})


