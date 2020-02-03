

Template.devices.helpers({
    'data': function () {
        let data = {
            devices: [],
            total: 0,
            online: 0,
        };

        data.devices = Devices.find({}).fetch();
        data.total = data.devices.length;

        data.devices.forEach(function (device) {
            let time1 = device.ping_stamp;
            let time2 = new Date().getTime();

            let diff = getDiffSeconds(time2, time1);

            if (diff < 30) { //ping stamp update every 30 seconds
                data.online++;
            }
        });

        return data;
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
    'click .js-device-select': function (event) {
        let deviceId = $(event.currentTarget).data('device-id');

        Router.go("/devices/edit/" + deviceId);
    },
});