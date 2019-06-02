let oldCount;

var items;
var template;
var plates;
var device;
var query;


Template.displayCrepes.onRendered(function () {
    template = Session.get("template");

    query = Router.current().params.query;


    Session.set("slideLang", "pt");

    var slide = 0,
        slides = document.querySelectorAll('.slide-item'),
        numSlides = slides.length,
        interval = 10000;

    var langInterval,
        langCount = 0;

    oldCount = numSlides;


    //oldCount = Plates.find({ "_id": { "$in": Session.get("device").display_items } }).fetch().length;
    currentSlide = function () {

        //get class list
        var itemToShow = Math.abs(slide % numSlides);
        [].forEach.call(slides, function (el) {
            el.classList.remove('slideActive')
        });
        //console.log(slides);
        slides[itemToShow].classList.add('slideActive');

        //resetProgress();
        resetInterval();
    },
        next = function () {
            slide++;
            currentSlide();
        },
        prev = function () {
            slide--;
            currentSlide();
        },
        resetslide = function () {
            var elm = document.querySelector('#slides > li'),
                newone = elm.cloneNode(true),
                x = elm.parentNode.replaceChild(newone, elm);
        },
        resetInterval = function () {
            clearInterval(langInterval);
            langInterval = setInterval(function() {
                // Do something every 2 seconds
                langCount++;
                
                if (langCount == 1) {
                    Session.set("slideLang", "en");
                } else if (langCount == 2) {
                    Session.set("slideLang", "es");
                }else{
                    langCount = 0;
                    Session.set("slideLang", "pt");
                }
    
            }, interval / 3);

            clearInterval(autonext);
            autonext = setInterval(function () {
                slide++;
                currentSlide();
            }, interval);
        },
        autonext = setInterval(function () {
            next();
        }, interval);
});


Template.displayCrepes.helpers({
    'platesList': function () {

       plates = Session.get("plates");
       device = Session.get("device");
   
   
       if(template){
           console.log(template.name);
           console.log(Session.get("template").name);
       }
       
   
       if(template && template._id !== Session.get("template")._id){
           console.log("Template has changed!!!");
           
           Router.go("/display?" + $.param(query));
           //Router.current().redirect("/display?" + $.param(query));

           //document.location.href = window.location.origin + "/display?" + $.param(query);
       }else{
           
           //let plates = Session.get("plates");
           if (plates && oldCount && oldCount !== plates.length) {
               console.log("plates changed !!!");
               //document.location.reload(true);
           }
       }

        return plates;
    },
    'plateLang': function(plate){
        let text = plate["info_" + Session.get("slideLang")];

        return text;

    }
});



