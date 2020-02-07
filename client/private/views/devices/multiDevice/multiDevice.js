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
    let schedule = MultiscreenSchedule.findOne();

    if (!schedule) {
        /* Here we create one */
        MultiscreenSchedule.insert({
            "devices": {},
            "stamp": 0,
            "schedule": { "hour": 0, "minute": 0 }
        });
    }
});

Template.multiDevice.helpers({
    'devices': function () {
        return Devices.find().fetch();
    },
    'schedule': function () {
        return MultiscreenSchedule.findOne();
    },
    'scheduleValid': function () {
        let schedule = MultiscreenSchedule.findOne();

        if (schedule.schedule.hour && schedule.schedule.minute && schedule.devices) {

            const keys = Object.keys(schedule.devices)
            for (const key of keys) {
                if (schedule.devices[key].video === "" || !schedule.devices[key].confirmed_download) {
                    return false;
                }
            }
        }


        return true;

    },
    'deviceSelected': function (deviceId) {
        let schedule = MultiscreenSchedule.findOne();
        return schedule.devices[deviceId];
    },
    'deviceConfirmed': function (deviceId) {
        let schedule = MultiscreenSchedule.findOne();
        return schedule.devices[deviceId].confirmed_download;
    },
    'getVideo': function (deviceId) {
        let schedule = MultiscreenSchedule.findOne();

        let device = schedule.devices[deviceId];
        if (device.video) {
            let video = Videos.findOne({ "_id": device.video });

            if (video) {
                return video.original.name;
            } else {
                return "";
            }


        } else {
            return "";
        }


    }
})

Template.multiDevice.events({
    'change .js-schedule-edit': function (event) {
        let schedule = MultiscreenSchedule.findOne();
        let value = $(event.target).val();
        let key = $(event.target).data('key');

        let data = {};
        data[key] = value;

        MultiscreenSchedule.update(schedule._id, {
            $set: data
        });


    },
    'click .js-device-select': function (event) {
        let deviceId = $(event.target).data("device-id");
        let schedule = MultiscreenSchedule.findOne();

        data = schedule.devices;

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
                data[deviceId].video = video._id;

                MultiscreenSchedule.update(schedule._id, {
                    $set: { "devices": data }
                });
            }
        });

    },
})