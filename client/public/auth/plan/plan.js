Template.plan.helpers({
    'userBasic': function () {

        let sub = PlanSubscriptions.findOne();


        if (sub) {
            return sub.plan_id === "basic";
        } else {
            return false;
        }
    },
    'userTrial': function () {
        let sub = PlanSubscriptions.findOne();

        if (sub) {
            return sub.plan_id === "trial";
        } else {
            return false;
        }
    },
    'planActive': function () {
        let sub = PlanSubscriptions.findOne();

        /* let diff = getDiffSeconds(sub.stamp_end, new Date().getTime());

        console.log(diff); */

        /* let days = getDaysFromSeconds(diff);

        console.log(days); */

        if (new Date().getTime() >= sub.stamp_end) {
            return false;
        } else {
            return true;
        }
    },
    'trialEnded': function () {
        return PlanSubscriptionsArchive.findOne({ "plan_id": "trial" });
    }
});

Template.plan.events({
    'click .js-plan-trial': function () {
        if (Meteor.user()) {
            Meteor.call("plans.subscribe", "trial", function (err, res) {

                console.log(err);
                console.log(res);
            });
        } else {
            Router.go("user.register");
        }
    },
    'click .js-plan-basic': function () {
        if (Meteor.user()) {
            Meteor.call("plans.subscribe", "basic", function (err, res) {
                console.log(err);
                console.log(res);
            });
        } else {
            Router.go("user.register");
        }
    },
    'click .js-plan-deactivate': function () {
        if (Meteor.user()) {
            let sub = PlanSubscriptions.findOne();

            if (sub) {
                Meteor.call("plans.archive", sub._id, function (err, res) {
                    console.log(err);
                    console.log(res);
                });
            }

        } else {
            Router.go("user.register");
        }
    },
});