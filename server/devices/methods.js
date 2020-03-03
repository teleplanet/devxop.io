Meteor.methods({
    'devices.edit': function (id, data) {
        //console.log(data);

        data["update"] = true;

        return Devices.update(id, {
            $set: data,
        });
    },
    'devices.remove': function (id) {

        return Devices.remove(id);
    },
    'devices.subscribe': function (sub) {

        let data = JSON.parse(sub);
        data['endpoint'] = sub;

        let exists = PagerSubscriptions.findOne({ 'keys.auth': data.keys.auth });

        if (!exists) {
            //create subscription
            let id = PagerSubscriptions.insert(data);

            return id;
        } else {
            return exists;
        }
    },
    'devices.unsubscribe': function (sub) {
        let data = JSON.parse(sub);

        //remove subscription
        return PagerSubscriptions.remove({ 'keys.auth': data.keys.auth });

    },
    'devices.cron': function () {

        let data = {
            'time_start_text_parser': 'every 15 minutes'
        };

        SyncedCron.add({
            name: 'Device Schedule',
            schedule: function (parser) {
                // parser is a later.parse object
                return parser.recur().on(2).minute().and().on(4).minute().and().every(15).minute();//parser.recur().on(2).minute();//parser.recur().on(14).minute();//parser.text(data.time_start_text_parser);
            },
            job: function () {
                let hour = new Date().getHours();
                let schedules = DeviceSchedules.find({"hour": ""+hour}).fetch();
                for (let i = 0; i < schedules.length; i++) {
                    let schedule = schedules[i];
                    let device = Devices.findOne(schedule.device_id);

                    if (parseInt(schedule.hour) == hour && schedule.status == "ended") {
                        //run action
                        if (schedule.action == "template") {

                            DeviceSchedules.update(schedule._id, {
                                $set: {
                                    "status": "started",
                                    "last_display": device.selected_display,
                                    "last_display_type": device.display_types[device.selected_display]
                                }
                            });

                            let data = device.display_types;
                            data["template"]["id"] = schedule.template_id;
                            Devices.update(schedule.device_id, {
                                $set: {
                                    "selected_display": "template",
                                    "display_types": data
                                }
                            });
                        }

                    }else if(schedule.status == "started"){
                        //here we validate that time is exceeded- Return to old screen visualization
                        if(schedule.duration.length == 0){
                            schedule.duration = 0;
                        }

                        let expectedTime = parseInt(schedule.hour) + parseInt(schedule.duration)
                        
                        if(expectedTime > 24){
                            expectedTime = expectedTime-24;
                        }

                        if(hour >= expectedTime){
                            //hour has reached duration end time
                            if (schedule.action == "template") {
                                let data = device.display_types;
                                data[schedule.last_display] = schedule.last_display_type; 
                                Devices.update(schedule.device_id, {
                                    $set: {
                                        "selected_display": device.last_display,
                                        "display_types": data
                                    }
                                });

                                DeviceSchedules.update(schedule._id, {
                                    $set: {
                                        "status": "ended"
                                    }
                                });

                            }
                        }
                    }


                }

            }
        });

        SyncedCron.start(data);

    },
    'devices.register': function (data) {
        let user = Accounts.findUserByEmail(data.user);
        let result = Accounts._checkPassword(user, data.pass);

        if (result["error"]) {
            //invalid authentication attempt
            return null;
        } else {
            let device = {
                device_id: data.id,
                stamp: new Date().getTime(),
                user_id: user._id
            };


            let exists = Devices.findOne({ "device_id": data.id });

            if (exists) {
                Devices.remove(exists._id);
            }

            return Devices.insert(device);
        }


    },
    'devices.ping': function (device) {
        //console.log(data);

        if (device) {
            Devices.update({
                "_id": device._id,
            },
                {
                    $set: {
                        'ping_stamp': new Date().getTime()
                    }
                });
        }

    }
})