enforceMinMax = function (el) {
    if (el.value != "") {
        if (parseInt(el.value) < parseInt(el.min)) {
            el.value = el.min;
        }
        if (parseInt(el.value) > parseInt(el.max)) {
            el.value = el.max;
        }
    }
}

Template.multiDevice.onRendered(function () {

});

Template.multiDevice.helpers({
    'data': function () {
        data = {
            "schedule_ready": false,
            "schedule": null,
            "devices": [],
            "schedule_hour": 0,
            "schedule_minute": 0,
            "schedule_devices": [],
            "schedule_active": false
        }

        data.devices = Devices.find().fetch();
        data.schedule = MultiscreenSchedule.findOne();

        if (data.schedule) {
            data.schedule_active = data.schedule.active;
            data.schedule_devices = data.schedule["devices"];
            data.schedule_hour = data.schedule.schedule.hour;
            data.schedule_minute = data.schedule.schedule.minute;

            if (data.schedule_hour && data.schedule_minute && data.schedule_devices) {
                const keys = Object.keys(data.schedule_devices)
                for (const key of keys) {
                    if (data.schedule_devices[key].video === "" || !data.schedule_devices[key].confirmed_download) {
                        data.schedule_ready = false;
                    } else {
                        data.schedule_ready = true;
                    }
                }
            }
        }

        for (let i = 0; i < data.devices.length; i++) {
            let device = data.devices[i];

            let selected = data.schedule_devices[device._id];
            if (selected) {
                data.devices[i]["schedule_selected"] = true;
                data.devices[i]["schedule_download_confirmed"] = selected.confirmed_download;
                data.devices[i]["schedule_status"] = selected.status;
                data.devices[i]["schedule_video"] = "";

                let video = Videos.findOne({ "_id": selected.video });
                if (video) {
                    data.devices[i]["schedule_video"] = video.original.name;
                }
            }
        }

        //console.log(data)


        return data;
    },
})

Template.multiDevice.events({
    'change, click .js-schedule-edit': function (event) {
        let schedule = MultiscreenSchedule.findOne();
        let value = $(event.target).val();
        let key = $(event.target).data('key');


        isCheckbox = $(event.target).is(':checkbox');
        if (isCheckbox) {
            if ($(event.target).is(":checked")) {
                data[key] = true;
            } else {
                data[key] = false;
            }
        } else {
            let data = {};
            data[key] = JSON.parse(value);
        }


        const keys = Object.keys(schedule.devices)
        for (const key of keys) {
            Devices.update(key, {
                $set: {
                    "update_schedule": true,
                    "update": true
                }
            })
        }


        MultiscreenSchedule.update(schedule._id, {
            $set: data
        });


    },
    'click .js-device-select': function (event) {
        let deviceId = $(event.target).data("device-id");
        let schedule = MultiscreenSchedule.findOne();

        data = schedule.devices;

        console.log(data[deviceId]);
        console.log(typeof data[deviceId] !== "undefined");

        if (typeof data[deviceId] !== "undefined") {
            delete data[deviceId];
        } else {
            data[deviceId] = {
                "video": "",
                "confirmed_download": false,
                "confirmed_alarm": false,
            }
        }

        MultiscreenSchedule.update(schedule._id, {
            $set: { "devices": data }
        });


    },
    'click .js-video-select': function () {
        let deviceId = $(event.target).data("device-id");
        let schedule = MultiscreenSchedule.findOne();

        videoListModal(function (err, video) {
            if (video) {
                data = schedule.devices;
                data[deviceId] = {
                    "video": video._id,
                    "confirmed_download": false,
                    "confirmed_alarm": false,
                }

                Devices.update(deviceId, {
                    $set: {
                        "update_schedule": true,
                        "update": true
                    }
                })

                MultiscreenSchedule.update(schedule._id, {
                    $set: { "devices": data }
                });
            }
        });

    },
})