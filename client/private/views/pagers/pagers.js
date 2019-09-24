
Template.pagers.onRendered(function () {

    $(document).ready(function () {
        $('#pager-tabs').tabs();
    });

    let pagers = Pagers.find().fetch();

    if (pagers.length < 1) {
        console.log('[FXT] Setting up 24 virtual pagers');

        for (let i = 1; i < 25; i++) {
            Pagers.insert({
                "user_id": Meteor.userId(),
                "name": "Pager " + i,
                "index": i,
                "state": 1
            });
        }
    }
});


Template.pagers.helpers({
    'pagers': function () {
        return Pagers.find().fetch();
    },
    'isActive': function (state, comparison) {
        if (state == comparison) {
            return "active";
        } else {
            return "";
        }
    }

});


Template.pagers.events({
    'click .js-state-select': function (event) {
        let pagerId = $(event.target).data("pager-id");
        let pagerNum = $(event.target).data("pager-num");
        let state = $(event.target).data("state");

        if (state == 1) {
            let data = {
                pager: pagerNum,
                company_id: Session.get("company")._id
            };

            //here we reset push notification by removing user notifications option
            Meteor.call("notifications.unsubscribe", data, function (err) {
                if (err) {
                    console.log(err);
                } else {

                }
            });
            //here we assume that user wants to reset pager, meaning the food has been delivered.
            /* confirmPopup({
                title: "Pager status will be reset",
                msg: "Are you sure you want to reset pager? User notification subscription will also be removed. User will need to subscribe again to me notified.",
                btn_type: "danger",
                btn_msg: "Reset Pager " + pagerNum
            },
                function (canceled, confirmed) {
                    if (canceled) {
                        //console.log("Pager reset canceled.");
                    } else if (confirmed) {

                        let data = {
                            pager: pagerNum,
                            company_id: Session.get("company")._id
                        };

                        //here we reset push notification by removing user notifications option
                        Meteor.call("notifications.unsubscribe", data, function (err) {
                            if (err) {
                                console.log(err);
                            } else {

                            }
                        });
                    }
                }); */
        }else if(state == 3) {

            let data = {
                pager: pagerNum,
                company_id: Session.get("company")._id
            }

            //here send a notification
            Meteor.call("notifications.notify", data, function (err) {
                if (err) {
                    console.log(err);
                } else {

                }
            });
        }

        Pagers.update(pagerId, {
            $set: {
                "state": state
            },
        });
    }
});