Meteor.methods({
    'pagers.insert': function (data) {

        let id = Pagers.insert(data);

        return true;

    }
})