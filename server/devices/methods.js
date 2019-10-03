Meteor.methods({
    'devices.edit': function (id, data) {
        //console.log(data);

        return Devices.update(id, {
            $set: data,
        });
    },
    'devices.remove': function(id){

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
                    $set: {"selected_display": data.next_display},
                });

                return "changed device display";
            }
        });

        SyncedCron.start(device, data);

    }
})