Template.socialInfo.events({
    'click .js-login-fb': function () {
        FB.login(function (response) {
            if (response.authResponse) {

                let fb = {};

                FB.api('/me', function (response) {

                    fb["user"] = response;

                    FB.api('/me/accounts', function (response) {
                        fb["pages"] = response;

                        Session.set("fb", fb);
                    });


                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, { perms: 'publish_pages,instagram_basic' });
    },
    'click .js-fb-logout': function () {
        Session.set("fb", undefined);
        notifyMessage("You have disconnected your facebook account from devxop", "info");
        /*  FB.logout(function(response) {
             // user is now logged out
             console.log(response);
             Session.set("fb", undefined);
             notifyMessage("You have disconnected your facebook account from devxop", "info");
         }); */
    },
})

Template.socialInfo.helpers({
    'fb': function () {
        return Session.get("fb");
    }
});