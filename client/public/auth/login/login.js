Template.login.events({
    'submit #loginForm': function (e, t) {
        e.preventDefault();

        var email = t.find('#inputEmail').value.trim(),
            password = t.find('#inputPassword').value.trim();

        Meteor.loginWithPassword(email, password, function (err, data) {
            if (err) {
                console.log(err.reason);
            } else {
                Router.go("/");
            }
        });

        return false;

    },
})