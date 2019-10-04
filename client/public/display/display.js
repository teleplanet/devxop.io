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