Template.display.onRendered(function () {

    let deviceId = Router.current().params.query.deviceId;
    let accessToken = Router.current().params.query.accessToken;

    let device = Devices.findOne({ "device_id": deviceId, "auth.access_token": accessToken });
    if (!device) {
        //window.location.reload(true);
        console.log("no device found");
    } else {
        Session.set("device", device);
    }
});

Template.display.events({

});

Template.display.helpers({

});