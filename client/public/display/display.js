Template.display.onRendered(function () {
    this.sessionWatcher = Session.watch('device', function (value) {
        if (value.selected_display == "slider") {
            setTimeout(function () {
                slider();
            }, 2000);

        }
    });

});

function slider() {
    $(".carousel-item").first().addClass("active");
    /*     $(".carousel-item").removeClass("active"); */
    /* $(".carousel-item").first().addClass("active"); */
    /* $('#slider').carousel({
        interval: 2000,
    }); */
    $('.carousel').carousel({
        interval: 6000,
    });
    /* $('.carousel').on('slide.bs.carousel', function () {
        $(".carousel-item").removeClass("active");
    }); */
}

Template.display.events({

});

Template.display.helpers({
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