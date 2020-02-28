

Template.devices.helpers({
    'data': function () {
        let data = {
            devices: [],
            total: 0,
            online: 0,
            devices_ordered: [],
        };

        let cols = 7;
        let rows = 3;

        data.devices_ordered = new Array(rows);

        for (let i = 0; i < data.devices_ordered.length; i++) {
            data.devices_ordered[i] = [];
            for (let z = 0; z < cols; z++) {
                data.devices_ordered[i].push('');
            }
        }

        data.devices = Devices.find({}).fetch();
        data.total = data.devices.length;

        data.devices.forEach(function (device) {

            if (typeof device.order == "undefined") {
                //here we will loop through the array and find an empty spot to add the device that
                //as yet to have an ordered index.~
                let breakAll = false;
                for (let i = 0; i < data.devices_ordered.length; i++) {
                    if(breakAll) break;
                    for (let z = 0; z < data.devices_ordered[i].length; z++) {
                        let box = data.devices_ordered[i][z];
                        if(typeof box != "object"){
                            data.devices_ordered[i][z] = device;
                            breakAll = true;
                            break;
                        }
                    }
                }
            } else {
                data.devices_ordered[device.order.row][device.order.col] = device;
            }



            let time1 = device.ping_stamp;
            let time2 = new Date().getTime();

            let diff = getDiffSeconds(time2, time1);

            if (diff < 30) { //ping stamp update every 30 seconds
                data.online++;
            }
        });

        //console.log(data.devices_ordered);

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
    'change .js-edit-order': function (event) {
        let key = $(event.currentTarget).data('key');
        let val = $(event.currentTarget).val();
        let company = Companies.findOne();

        let data = {};
        data[key] = val;


        Companies.update(company._id, {
            $set: { "order": data }
        });
    }
});