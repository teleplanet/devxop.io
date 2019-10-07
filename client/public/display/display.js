Template.display.onRendered(function () {
    this.sessionWatcher = Session.watch('device', function (value) {
        if (value) {
            if (value.selected_display == "slider") {
                setTimeout(function () {
                    slider();
                }, 2000);

            }else if(value.force_refresh){
                console.log("force refresh");
            }
        }

    });


});


$(function() {
    // Handler for .ready() called.
    let device = Session.get("device");
    ping(device);

    setInterval(function(){
        let device = Session.get("device");

        if(device){
            ping(device);
        }else{
            
        }
    }, 1000 * 60 * 2); //two minute
});


function ping(device){
    Meteor.call("devices.ping", device);
}

function slider() {
    $(".carousel-item").first().addClass("active");

    $('.carousel').carousel({
        interval: 6000,
    });
}

Template.display.events({

});

Template.display.helpers({
    'device': function () {
        let device = Session.get("device");

        if (device) {
            return true;
        } else {
            return false;
        }
    },
    'getDisplay': function (type) {

        let device = Session.get("device");

        return type == device.selected_display;
    },
    'static': function () {
        let device = Session.get("device");
        return device.display_types.static.image;
    },
    'video': function () {
        let device = Session.get("device");

        return device.display_types.video.video;
    },
    'videoLink':function(){
        let device = Session.get("device");

        return device.display_types.videoUrl.url;
    },
    'url': function () {
        let device = Session.get("device");
        return device.display_types.url.url;
    },
    'code': function () {
        let device = Session.get("device");
        return device.display_types.code.code;
    },
    'items': function () {
        return Items.find().fetch();
    }
});