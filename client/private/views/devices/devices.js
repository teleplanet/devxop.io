
Template.devices.onRendered(function () {
    Session.set("module.selectedDisplay", "");
});

Template.devices.helpers({
    'listDevices': function () {
        return Devices.find({}).fetch();
    },
    'getLiveDisplay': function (device) {
        let display = device["selected_display"];

        if (display) {
            return display;
        } else {
            return "No live template";
        }

    },
    'getStatus': function (device) {
        if (device && device["ping_stamp"]) {
            let time1 = device.ping_stamp;
            let time2 = new Date().getTime();
            let res;

            let diff = getDiffSeconds(time2, time1);

            if (diff > 130) { //ping stamp update every 30 seconds
                res = "offline";

                return res;
            } else {
                res = "online";

                return res;
            }

        } else {
            res = "unknown";

            return res;
        }
    }
});

Template.devices.events({
    'click .js-devices-card-select': function (event) {
        let deviceId = $(event.currentTarget).data('item-id');

        Router.go("/devices/edit/" + deviceId);
    },
});