Meteor.methods({
    'revenues.insert': function (data) {

        let id = Revenues.insert(data);

        return true;

    },
    'revenues.remove': function (id) {
        let revenue = Revenues.remove({
            '_id': id,
        });

        return true;

    }
})