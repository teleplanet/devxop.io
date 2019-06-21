Meteor.methods({
    'devices.edit':function (id, data) {
        //console.log(data);
        
        Devices.update(id, {
            $set: data,
        });
    },
    'devices.subscribe': function (sub) {

        let data = JSON.parse(sub);
        data['endpoint'] = sub;

        let exists = PagerSubscriptions.findOne({'keys.auth': data.keys.auth});

        if(!exists){
            //create subscription
            let id = PagerSubscriptions.insert(data);

            return id;
        }else {
            return exists;
        }
    },
    'devices.unsubscribe': function(sub){
        let data = JSON.parse(sub);

        //remove subscription
        return PagerSubscriptions.remove({'keys.auth': data.keys.auth});

    }
})