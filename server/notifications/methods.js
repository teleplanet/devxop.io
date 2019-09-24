const webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys = {
  publicKey: "BA477LIzpRITyZ83BaNVX5mjUOiNok2p0Kt9k7elV8sjmtro_kfwpcdVcD5JxVEGNyW5-P1QRny2n-K4GGodSi0",
  privateKey: "XShFUo4EmT3Rct5b6piiVs75_kjpXzQqiVgg2qxIlZg"
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
  'notifications.validate': function (data) {

    let sub = PushNotifications.findOne(data);

    if (!sub) {
      return;
    } else {
      return sub;
    }
  },
  'notifications.subscribe': function (data) {

    PushNotifications.remove({ "company_id": data.company_id, "user_fingerprint": data.user_fingerprint }, function (err) {
      PushNotifications.insert(data);
    });
  },
  'notifications.unsubscribe': function (data) {
    if (data.pager)
      data.pager = data.pager.toString();


    let sub = PushNotifications.findOne(data);
    if (sub) {
      PushNotifications.remove(sub._id);
    }

  },
  'notifications.notify': function (data) {
    data.pager = data.pager.toString();
    let sub = PushNotifications.findOne(data);

    if (sub) {
      let company = Companies.findOne({ "_id": sub.company_id },
        { fields: { 
          name: 1,
          _id: 0,
          image_thumb: 1,
          endpoint: 1
        } 
      });

      //company.image_thumb = thumbUrl(company.image_thumb);

      let data = {
        company: company,
        pager: sub.pager
      };



      webpush.sendNotification(JSON.parse(sub.payload), JSON.stringify(data));
    } else {
      console.log("couldnt find sub to send notification");
    }

    /* let notifications = PushNotifications.find().fetch();

    for(let i = 0; i < notifications.length; i++){
      //console.log(notifications[i]);
      webpush.sendNotification(JSON.parse(notifications[i].payload), 'Your Push Payload Text');
    } */
  },
})


