Meteor.methods({
    'items.edit': function (id, data) {
        //console.log(data);
        
        data["user_id"] = this.userId;

        Items.update(id, {
            $set: data,
        });
    },
    'items.insert': function (data) {

        data["user_id"] = this.userId;

        let id = Items.insert(data);

        return true;

    },
    'items.remove': function (itemId) {

        let id = Items.remove({
            '_id': itemId,
            'user_id': this.userId
        });

        return true;

    },
    'items.docs': function (query) {
        //console.log(data);
        return Items.find(query).fetch();
        
    },
})