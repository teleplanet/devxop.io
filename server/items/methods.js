Meteor.methods({
    'items.edit': function (id, data) {
        //console.log(data);
        
        Items.update(id, {
            $set: data,
        });
    },
    'items.insert': function (data) {

        let id = Items.insert(data);

        return true;

    },
    'items.remove': function (itemId) {
        let id = Items.remove({
            '_id': itemId,
        });

        return true;

    }
})