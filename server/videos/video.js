Meteor.methods({
    'videos.edit': function (id, data) {
        //console.log(data);
        
        data["user_id"] = this.userId;

        Items.update(id, {
            $set: data,
        });
    },
    'videos.insert': function (data) {

        data["user_id"] = this.userId;

        let id = Videos.insert(data);

        return true;

    },
    'videos.remove': function (itemId) {

        let id = Items.remove({
            '_id': itemId,
            'user_id': this.userId
        });

        return true;

    }
})