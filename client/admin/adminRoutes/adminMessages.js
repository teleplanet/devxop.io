Template.adminMessages.helpers({
    'messages': function () {
        return Message.find().fetch();
    },
});

Template.adminMessages.events({
    
});