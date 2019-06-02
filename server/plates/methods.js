Meteor.methods({
    'plates.insert': function (data) {

        let id = Plates.insert(data);

        return true;

    },
    'plates.remove': function (plateId) {
        let id = Plates.remove({
            '_id': plateId,
        });

        return true;

    }
})