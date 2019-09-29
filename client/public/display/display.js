Template.display.onRendered(function () {

    let deviceId = Router.current().params.query.deviceId;
    let accessToken = Router.current().params.query.accessToken;

    /* $('.jquery-background-video').bgVideo({fadeIn: 2000}); */
});

Template.display.events({

});

Template.display.helpers({
    'getDisplay': function (type) {

        let device = Session.get("device");

        return type == device.selected_display;
    },
    'static': function(){
        let device = Session.get("device");
        return device.display_types.static.image;
    },
    'video': function(){
        let device = Session.get("device");

        return device.display_types.video.video;
    },
    'url': function(){
        let device = Session.get("device");
        return device.display_types.url.url;
    },
    'code': function(){
        let device = Session.get("device");
        return device.display_types.code.code;
    },
    'items': function(){
        return Items.find().fetch();
    }
});