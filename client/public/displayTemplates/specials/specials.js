var oldCount;

var items;
var template;
var plates;
var device;

var langInterval;

Template.displaySpecials.onRendered(function () {
    $(document).ready(function () {
        $('.slider').slider({
            indicators: false,
            duration: 1000,
            interval: 8000,
        });
    });

    $('.slides').bind("DOMSubtreeModified", function () {
        console.log("changed! updating slider");
        setTimeout(function () {
            $('.slider').slider({
                indicators: false,
                duration: 1000,
                interval: 8000,
            });
        }, 2000);

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
    /* 'imageFlipped': function(){

    },
    'platesList': function () {
        let plates = Session.get("plates");



        plates = Session.get("plates");
        device = Session.get("device");


        if (template) {
            console.log(template.name);
            console.log(Session.get("template").name);
        }


        if (template && template._id !== Session.get("template")._id) {
            console.log("Template has changed!!!");

            Router.go("/display?" + $.param(query));
            //Router.current().redirect("/display?" + $.param(query));
            //document.location.href = window.location.origin + "/display?" + $.param(query);
        } else {

            //let plates = Session.get("plates");
            if (plates && oldCount && oldCount !== plates.length) {
                console.log("plates changed !!!");
                document.location.reload(true);
            }
        }


        return plates;
    },
    'plateLang': function (plate) {
        let text = plate["info_" + Session.get("slideLang")];

        return text;

    } */
});



