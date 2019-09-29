Template.display.onRendered(function () {

    let deviceId = Router.current().params.query.deviceId;
    let accessToken = Router.current().params.query.accessToken;

    let device = Devices.findOne({ "device_id": deviceId, "auth.access_token": accessToken });
    if (!device) {
        //window.location.reload(true);
        console.log("no device found");
    } else {
        Session.set("device", device);

        /* var self = this;
        // Subscribe
        var templateSub = Meteor.subscribe('displayTemplatesSubscriptionsPublic', device._id);

        // Do reactive stuff when subscribe is ready
        self.autorun(function () {
            if (!templateSub.subscriptionsReady()) {
                return;
            } else {
                let template = DisplayTemplates.findOne({ "_id": device.selected_display });

                if (template) {
                    Deps.autorun(function () {
                        var subscription2 = Meteor.subscribe('itemsSubscriptionsPublic', template.display_items);
                        var subscriptionVideo = Meteor.subscribe('videos');
                        
                        if (subscription2.ready() && subscriptionVideo) {
                            let finalPlates = Items.find().fetch();
                            let video = Videos.findOne({"_id": template.video_id});

                            Session.set("template", template);
                            Session.set("device", device);
                            Session.set("plates", finalPlates);
                            Session.set("video", video);

                            //Router.current().render("display" + template.name.capitalize());
                        }
                    });
                } else {
                    console.log("no template!");
                    window.location.reload(true);
                }
            }






        }); */

        //Session.set("template", DisplayTemplates.findOne({ "_id": device.selected_display }));
    }
});

Template.display.events({

});

Template.display.helpers({
    'template': function () {
        return Session.get("template");
    }
});