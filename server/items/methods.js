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

        return id;

    },
    'items.remove': function (itemId) {

        Items.remove(itemId);

        return true;

    },
    'items.docs': function (query) {
        //console.log(data);
        return Items.find(query).fetch();
        
    },
})