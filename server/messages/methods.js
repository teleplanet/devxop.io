Meteor.methods({
    'message.new': function (data) {

        let id = Message.insert(data);

        return id;

    },
})