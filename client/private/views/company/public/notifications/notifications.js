
const applicationServerPublicKey = 'BA477LIzpRITyZ83BaNVX5mjUOiNok2p0Kt9k7elV8sjmtro_kfwpcdVcD5JxVEGNyW5-P1QRny2n-K4GGodSi0';

let pushButton = null;

let isSubscribed = false;
let swRegistration = null;


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

function updateBtn() {
    if (Notification.permission === 'denied') {
        pushButton.text('Push Messaging Blocked.');
        pushButton.hide();
        updateSubscriptionOnServer(null);
        return;
    }

    if (isSubscribed) {
        pushButton.text('Disable Push Messaging');
    } else {
        pushButton.text('Enable Push Messaging');
    }

    pushButton.show();
}

function updateSubscriptionOnServer(subscription) {
    // TODO: Send subscription to application server

    const subscriptionJson = $('.js-subscription-json');
    const subscriptionDetails =
        $('.js-subscription-details');

    if (subscription) {
        /* Session.set("push.subscription", subscription); */
        let sub = JSON.stringify(subscription);

        let data = {
            payload: sub,
            user_fingerprint: Session.get("fingerprint"),
            company_id: Session.get("publicCompany")._id,
            pager: Session.get("pager.number"),
            created: new Date().getTime()
        }


        Meteor.call("notifications.subscribe", data, function (err, data) {
            if (err) { }
            else {
                console.log("[ServiceWorker] Pager subscribed: " + data);
            }
        });

        //subscriptionJson.text(sub);
        //subscriptionDetails.removeClass('is-invisible');
    } else {
        //subscriptionDetails.addClass('is-invisible');

        let data = {
            user_fingerprint: Session.get("fingerprint"),
            company_id: Session.get("publicCompany")._id
        }

        Meteor.call("notifications.unsubscribe", data, function (err, data) {
            if (err) { }
            else {
                console.log("[ServiceWorker] Pager unsubscribed");

                /* Session.set("push.subscription", false); */
            }
        });
    }
}

subscribeUser = function () {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    })
        .then(function (subscription) {
            console.log('User is subscribed.');


            updateSubscriptionOnServer(subscription);

            isSubscribed = true;

            //updateBtn();
        })
        .catch(function (err) {
            console.log('Failed to subscribe the user: ', err);
            //updateBtn();
        });
}

unsubscribeUser = function () {
    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            if (subscription) {
                let sub = JSON.stringify(subscription);

                let data = {_id: Session.get("push.subscription")._id};

                //here we reset push notification by removing user notifications option
                Meteor.call("notifications.unsubscribe", data, function (err) {
                    if (err) {
                        console.log(err);
                    } else {

                    }
                });

                return subscription.unsubscribe();
            }
        })
        .catch(function (error) {
            console.log('Error unsubscribing', error);
        })
        .then(function (sub) {
            updateSubscriptionOnServer(null);

            console.log('User is unsubscribed.');
            isSubscribed = false;

            //updateBtn();
        });
}

function initializeUI() {

    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            isSubscribed = !(subscription === null);


            let sub = Session.get("push.subscription");

            if (sub) {

                updateSubscriptionOnServer(subscription);

                if (isSubscribed) {
                    console.log('User IS subscribed.');
                    console.log(subscription);

                    console.log(JSON.stringify(subscription));
                } else {
                    console.log('User is NOT subscribed.');
                }
            } else {
                unsubscribeUser();
                console.log('User is NOT subscribed.');

                updateSubscriptionOnServer(null);
                isSubscribed = false;
            }
            //updateBtn();
        });
}

Template.notification.onRendered(function () {

    let query = {
        user_fingerprint: Session.get("fingerprint"),
        company_id: Companies.findOne()._id
    };

    var self = this;

    // Subscribe
    self.subscribe("publicPushNotifications", query);

    // Do reactive stuff when subscribe is ready
    self.autorun(function () {
        if (!self.subscriptionsReady())
            return;

        Session.set("push.subscription", PushNotifications.findOne());


        if(!Session.get("push.subscription")){
            unsubscribeUser();
        }
        
    });

    pushButton = $('.js-push-btn');

    Notification.requestPermission(function (result) {
        console.log(result); // Chrome displays "denied"
        //################# NOTIFICATION WORKER #######################
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            console.log('Service Worker and Push is supported');

            navigator.serviceWorker.register('sw.js')
                .then(function (swReg) {
                    console.log('Service Worker is registered', swReg);

                    swRegistration = swReg;
                    initializeUI();
                })
                .catch(function (error) {
                    console.error('Service Worker Error', error);
                });
        } else {
            console.warn('Push messaging is not supported');
            pushButton.textContent = 'Push Not Supported';
        }
    });


});


Template.notification.helpers({
    'subscription': function () {
        return Session.get("push.subscription");
    }
})

Template.notification.events({
    'change .js-pager-number': function (event) {
        let num = $(event.target).val();

        Session.set("pager.number", num);

    },
    'click .js-sub-push': function () {

        let num = Session.get("pager.number");

        if (!num || num <= 0 || num >= 25) {

        } else {
            //pushButton.hide();
            if (isSubscribed) {
                unsubscribeUser();
            } else {
                subscribeUser();
            }
        }

    },
    'click .js-unsub-push': function () {
        unsubscribeUser();

    }
})