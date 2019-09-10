Meteor.methods({
    'collections.edit': function (id, data) {
        //console.log(data);
        
        data["user_id"] = this.userId;

        Collections.update(id, {
            $set: data,
        });
    },
    'collections.insert': function (data) {

        data["user_id"] = this.userId;

        let id = Collections.insert(data);

        return true;

    },
    'collections.remove': function (itemId) {

        let id = Collections.remove({
            '_id': itemId,
            'user_id': this.userId
        });

        return true;

    }
})