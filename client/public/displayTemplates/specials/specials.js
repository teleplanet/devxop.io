var oldCount;

var items;
var template;
var plates;
var device;

var langInterval;
var interval;

Template.displaySpecials.onRendered(function () {

    this.sessionWatcher = Session.watch('plates', function (value) {
        console.log("Session changed -> updating slider.");
        $('.carousel.carousel-slider').carousel({
            fullWidth: true,
            duration: 0,
        });

        interval = setInterval(function(){
            $('.carousel.carousel-slider').carousel("next");
        }, 8000)
        
    });
});


Template.displaySpecials.helpers({
    'plates': function () {
        return Session.get("plates");
    },
    'plateLang': function (plate) {
        let text = plate["info_" + Session.get("slideLang")];

        return text;

    }
});



