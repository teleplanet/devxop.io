Router.route('/plan', {
    name: "plan",
    controller: 'EmptyController',
    action: function () {
        /* let sessionId = this.params.query.session_id;

        console.log(this.params.query); */

        this.render();
    },
});

Router.route('/plan/success', {
    name: "plan.success",
    controller: 'EmptyController',
    action: function () {
        /* let sessionId = this.params.query.session_id;

        console.log(this.params.query); */

        Meteor.call("plans.renew", function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });

        this.render();
    },
});