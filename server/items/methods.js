Meteor.methods({
    'items.edit': function (id, data) {
        console.log(data);
        
        Plates.update(id, {
            $set: data,
        });
    },
})