
Template.devices.onRendered(function () {
    Session.set("module.selectedDisplay", "");
});

Template.devices.helpers({
    'listDevices': function () {
        return Devices.find({}).fetch();
    },
    'getLiveDisplay': function (device) {
        let display = DisplayTemplates.findOne({ "_id": device["selected_display"] });

        if (display) {
            return display["name"];
        } else {
            return "No live template";
        }

    },
    'getStatus': function (device, key) {
        if (device && device["ping_stamp"]) {
            let time1 = device.ping_stamp;
            let time2 = new Date().getTime();
            let res;

            let diff = getDiffSeconds(time2, time1);

            if (diff > 40) { //ping stamp update every 30 seconds
                res = {class: "back-red", text: "Offline"};

                return res[key];
            } else {
                res = {class: "back-green", text: "Online"};

                return res[key];
            }

        } else {
            res = {class: "", text: "Unknown"};

            return res[key];
        }
    }
});

Template.devices.events({
    'click .js-devices-card-select': function (event) {
        let deviceId = $(event.currentTarget).data('item-id');

        Router.go("/devices/edit/" + deviceId);
    },
});