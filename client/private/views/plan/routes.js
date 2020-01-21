
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
        let sessionId = this.params.query.session_id;

        console.log(this.params.query);

        if (sessionId) {
            Meteor.call("plans.renew", sessionId, function (err, result) {
                if (err) {
                    console.log(err);
                    Router.go("plan.error");
                } else {
                    console.log(result);
                    
                }
            });
        } else {
            Router.go("plan.error");
        }

        this.render();
    },
});

Router.route('/plan/error', {
    name: "plan.error",
    controller: 'EmptyController',
    action: function () {
        this.render();

    },
});