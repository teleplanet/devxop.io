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
            'device': "HZYLJMGfXFGkT8wDC",
            'next_display': "static",
            'time_start_text_parser': 'at 6:51pm every day'
        };

        let device = Devices.findOne({ "_id": data.device });

        SyncedCron.add({
            name: 'Display Changed...',
            schedule: function (parser) {
                // parser is a later.parse object
                return parser.text(data.time_start_text_parser);
            },
            job: function (device, data) {

                console.log(data);

                Devices.update(device._id, {
                    $set: { "selected_display": data.next_display },
                });

                return "changed device display";
            }
        });

        SyncedCron.start(device, data);

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