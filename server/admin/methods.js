Meteor.methods({
    'admin.users.edit': function (id, data) {
        //console.log(data);

        return Meteor.users.update(id, {
            $set: data,
        });
    },
    'admin.collections.edit': function (id, data) {
        //console.log(data);

        return Collections.update(id, {
            $set: data,
        });
    },
});