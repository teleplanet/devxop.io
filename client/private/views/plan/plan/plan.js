
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
        //let sub = PlanSubscriptions.findOne();
    

        return Session.get("plan.status");

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
    'click .js-pay-basic': function () {
        if (Meteor.user()) {
            let sub = PlanSubscriptions.findOne();

            if (sub) {
                Meteor.call("stripe.session.basic", window.location, function (err, data) {
                    if(err){
                        console.log(err);
                    }else{
                        if(data.id){
                            stripe.redirectToCheckout({
                                sessionId: data.id
                              }).then(function (result) {
                                // If `redirectToCheckout` fails due to a browser or network
                                console.log(result.error.message);
                              });
                        }else{
                            
                        }
                    }
                    
                    
                });
            }

        } else {
            Router.go("user.register");
        }
    },
});