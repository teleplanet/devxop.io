
const applicationServerPublicKey = 'BA477LIzpRITyZ83BaNVX5mjUOiNok2p0Kt9k7elV8sjmtro_kfwpcdVcD5JxVEGNyW5-P1QRny2n-K4GGodSi0';

isSubscribed = false;
swRegistration = null;


urlB64ToUint8Array = function(base64String) {
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

updateSubscriptionOnServer = function(subscription) {
    // TODO: Send subscription to application server
    if (subscription) {
        let sub = JSON.stringify(subscription);

        let data = {
            payload: sub,
            user_fingerprint: Session.get("fingerprint"),
            company_id: Session.get("publicCompany")._id,
            pager: Session.get("pager.number"),
            created: new Date().getTime()
        }

        let old = PushNotifications.findOne({ company_id: data.company_id, page: data.pager });
        if (old) {
            PushNotifications.remove(sub._id, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }

        PushNotifications.insert(data, function (err) {
            if (err) {
                console.log(err);
            }
        });

    } else {

        let sub = Session.get("push.subscription");

        if (sub) {
            PushNotifications.remove(sub._id, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
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

            //isSubscribed = true;

            //updateBtn();
        })
        .catch(function (err) {
            console.log('Failed to subscribe the user: ', err);
            updateSubscriptionOnServer(null);
            //updateBtn();
        });
}

unsubscribeUser = function () {

    if (swRegistration) {
        swRegistration.pushManager.getSubscription()
            .then(function (subscription) {
                if (subscription) {

                    let sub = Session.get("push.subscription");

                    if (sub) {
                        PushNotifications.remove(sub._id, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }

                    return subscription.unsubscribe();
                }
            })
            .catch(function (error) {
                console.log('Error unsubscribing', error);
            })
            .then(function (sub) {
                updateSubscriptionOnServer(null);
            });
    }


}

initializeUI = function() {
    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            let sub = Session.get("push.subscription");

            if (subscription && sub) {

                updateSubscriptionOnServer(subscription);
            } else {
                unsubscribeUser();
                updateSubscriptionOnServer(null);
            }
        })
        .catch(function (error) {
            console.log('Error unsubscribing', error);
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

        if (!Session.get("push.subscription")) {
            //unsubscribeUser();
            isSubscribed = false;
        } else {
            isSubscribed = true;
        }

    });

    Notification.requestPermission(function (result) {
        if ('serviceWorker' in navigator && 'PushManager' in window) {

            navigator.serviceWorker.register('/sw.js')
                .then(function (swReg) {
                    swRegistration = swReg;
                    initializeUI();


                    Session.set("push.supported", true);
                })
                .catch(function (error) {
                    Session.set("push.supported", false);
                });
        } else {
            Session.set("push.supported", false);
        }
    });

});


Template.notification.helpers({
    'subscription': function () {
        return Session.get("push.subscription");
    },
    'pushSupported': function () {
        return Session.get("push.supported");
    }
})

Template.notification.events({
    'change .js-pager-number': function (event) {
        let num = $(event.target).val();

        Session.set("pager.number", num);

    },
    'click #sub-push': function (event) {
        event.preventDefault();

        let num = $(".js-pager-number").val();//Session.get("pager.number");


        //console.log(num);

        if (!num || num <= 0 || num >= 25) {
            alert("no pager number inserted");
        } else {
            //pushButton.hide();
            if (isSubscribed) {
                unsubscribeUser();
            } else {
                subscribeUser();
            }
        }

    },
    'click #unsub-push': function (event) {
        event.preventDefault();
        unsubscribeUser();

    }
})