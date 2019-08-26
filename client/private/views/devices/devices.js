
Template.devices.onRendered(function () {
    Session.set("module.selectedDisplay", "");
});

Template.devices.helpers({
    'listDevices': function () {
        return Devices.find({ "auth.user_id": Meteor.userId() }).fetch();
    },
    'getLiveDisplay': function(device){
        let display = DisplayTemplates.findOne({ "_id": device["selected_display"] });

        if(display){
            return display["name"];
        }else{
            return "No live template";
        }
            
    }
});

Template.devices.events({
    'click .js-devices-card-select':function(event){
        let deviceId = $(event.currentTarget).data('item-id');

        Router.go("/devices/edit/" + deviceId);
    },
});