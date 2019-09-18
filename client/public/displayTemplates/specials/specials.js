var interval;
var refreshInit = 1;

Template.displaySpecials.onRendered(function () {
    $('#slider').carousel({
        fullWidth: true,
        duration: 0,
    });

    this.sessionWatcher = Session.watch('plates', function (value) {
        console.log("Plates session changed!");
        if(refreshInit == 1){
            console.log("Session watcher startup.");
            refreshInit = 2;//set variable so that next update refreshes page
        }else{
            console.log("Refreshing page...");
            location.reload();
        }

    });

    interval = setInterval(function () {
        let count = Session.get("plates").length;
        //console.log(count);
        if (count > 1) {
            $('.carousel.carousel-slider').carousel("next");
        }

    }, 8000)
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



