/* var image; */
var device;
Template.deviceEdit.onRendered(function () {
    device = Session.get("device-edit");

    let display = DisplayTemplates.findOne({"_id": device.selected_display});
    Session.set("module.selectedDisplay", display);
    //"http://localhost:3000"
    //$('.device-template-load').load(document.location.origin+ "/display" + template.name.capitalize());
    Session.set("template-load", document.location.origin+ "/display?deviceId=" + device.device_id + "&accessToken=" + device.auth.access_token);
});




Template.deviceEdit.helpers({
    'device': function () {
        return Session.get("device-edit");
    },
    'templateLoad': function(){
        return Session.get("template-load");
    }
});

Template.deviceEdit.events({

});
