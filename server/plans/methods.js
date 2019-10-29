Meteor.methods({
    'plans.cron': function () {

        //let subs = PlanSubscriptions.find().fetch();

        var now = new Date().getTime();

        // Remove matchng Documents
        let subs = PlanSubscriptions.find({ stamp_end: { $lt: now } }).fetch();

        for (let i = 0; i < subs.length; i++) {
            let currentSub = subs[i];

            if (currentSub.plan_id === "trial") {
                Meteor.call("plans.archive", currentSub._id);
            } else {
                let payed = StripeSessions.findOne({ "user_id": currentSub.user_id, "validated": true });

                Meteor.call("stripe.archive", payed);
            }



            /* Meteor.call("plans.archive", currentSub._id);
            let exist = PlanSubscriptions.findOne({ "_id": currentSub._id });

            if (!exist) {
                let doc = {
                    user_id: user._id,
                    stamp_created: new Date().getTime(),
                    plan_id: plan.plan_id,
                    stamp_start: new Date().getTime(),
                    stamp_end: new Date().getTime(),
                }

                let subId = PlanSubscriptions.insert(doc);
            } else {
                return "error occurred removing subs";
            } */

        }

        console.log("CRON:PLANS: [" + subs.length + "] subscriptions have ended. Sessions and plans have been archived!");

        return subs;

    },
    'plans.fixtures': function () {
        Plans.remove({});

        for (let i = 0; i < plansArray.length; i++) {
            let plan = plansArray[i];

            Plans.insert(plan);
        }
    },
    'plans.active': function () {
        let sub = PlanSubscriptions.findOne({ "user_id": this.userId });

        if (sub) {
            if (sub.plan_id === "trial") {
                let trialEnded = PlanSubscriptionsArchive.findOne({ "user_id": this.userId, "plan_id": "trial" });

                if (trialEnded) {
                    //trial has ended -> upgrade required
                    return false;
                } else {
                    //trial is still valid
                    return true;
                }
            } else {
                let payed = StripeSessions.findOne({ "user_id": this.userId, "validated": true })
                if (payed) {
                    if (new Date().getTime() >= sub.stamp_end) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            }


        } else {
            return false;
        }
    },
    'plans.renew': function (sessionId) {
        let session = StripeSessions.findOne({ "user_id": this.userId, "id": sessionId});

        console.log(session);
        if (session) {
            let oldSub = PlanSubscriptions.findOne({ "user_id": this.userId });


            Meteor.call("plans.archive", oldSub._id);

            Meteor.call("plans.subscribe", session.plan_id, true);

            StripeSessions.update(session._id, {
                $set: {
                    'validated': true
                }
            });

        } else {

        }
    },
    'plans.archive': function (planUnique, atPeriodEnd) {
        let planSub = PlanSubscriptions.findOne({ "_id": planUnique });

        if (planSub) {
            //atPeriodEnd We want to schedule a the archive for specified date -> not yet implemented
            if (!atPeriodEnd) {
                planSub["old_id"] = planSub._id;
                delete planSub._id;

                let archived = PlanSubscriptionsArchive.insert(planSub);

                if (archived) {
                    let removed = PlanSubscriptions.remove({ "_id": planUnique });

                    
                } else {
                    console.log("error occured while archiving");
                }
            } else {

            }


        }
    },
    'plans.subscribe': function (planId, renewed) {
        let user = Meteor.users.findOne({ "_id": this.userId }),
            plan = Plans.findOne({ "plan_id": planId }),
            res = { error: null, success: null, msg: "" };


        if (plan && user) {

            if (planId === "trial") {
                let trialEnded = PlanSubscriptionsArchive.findOne({ "user_id": user._id, "plan_id": "trial" });

                if (trialEnded) {
                    res.error = true;
                    res.success = false;
                    res.msg = "plan-trial-ended";

                    return res;
                }


            }

            let currentSub = PlanSubscriptions.findOne({ "user_id": user._id });
            if (currentSub) {
                if (currentSub.plan_id === planId) {
                    res.error = true;
                    res.success = false;
                    res.msg = "plan-sub-already-exists";

                    return res;
                } else {
                    Meteor.call("plans.archive", currentSub._id);
                    let exist = PlanSubscriptions.findOne({ "_id": currentSub._id });

                    if (!exist) {
                        let doc = {
                            user_id: user._id,
                            stamp_created: new Date().getTime(),
                            plan_id: plan.plan_id,
                            stamp_start: new Date().getTime(),
                            stamp_end: new Date().addDays(plan.period).getTime(),
                        }


                        let subId = PlanSubscriptions.insert(doc);


                        if (subId) {

                            res.error = false;
                            res.success = true;
                            res.msg = "plan-sub-success";

                            return res;
                        } else {
                            res.error = true;
                            res.success = false;
                            res.msg = "plan-sub-failed";

                            return res;
                        }
                    } else {
                        res.error = true;
                        res.success = false;
                        res.msg = "plan-sub-remove-failed";

                        return res;
                    }
                }
            } else {
                let subId = PlanSubscriptions.insert({
                    user_id: user._id,
                    stamp_created: new Date().getTime(),
                    plan_id: plan.plan_id,
                    stamp_start: new Date().getTime(),
                    stamp_end: new Date().addDays(plan.period).getTime(),
                });


                if (subId) {

                    res.error = false;
                    res.success = true;
                    res.msg = "plan-sub-success";

                    return res;
                } else {
                    res.error = true;
                    res.success = false;
                    res.msg = "plan-sub-failed";

                    return res;
                }
            }

        } else {
            res.error = true;
            res.success = false;
            res.msg = "plan-no-exist";

            return res;
        }
    },
    'plans.validate': function () {
        let user = Meteor.users.find({ "_id": this.userId });


    }
});