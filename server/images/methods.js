Meteor.methods({
    'images.insert': function (data) {

        let id = Images.insert(data);

        return id;

    }
})