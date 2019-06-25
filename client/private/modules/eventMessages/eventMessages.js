notifyMessage = function(msg, type, time){
    Session.set("module.eventMessages", {msg: msg, type: type, time: time})

    if ($("." + type)[0]){
        // Do something if class exists
        $(".js-event-message").removeClass("." + type);
    }

    $(".js-event-message").toggleClass(type);

    setTimeout(function(){
        //$(".js-event-message").css("transform", "translateY(130%)");

        $(".js-event-message").removeClass(type);

        Session.set("module.eventMessages", {});
    
        
    }, 2000)
}

Template.moduleEventMessages.onRendered(function(){
    Session.set("module.eventMessages", {});

    //example set message
    // Session.set("module.eventMessages", {msg: "testing", type: "success", time: 5000})

    /* Deps.autorun(function(){
        let event = Session.get("module.eventMessages");

        //console.log(event);

        $(".js-event-message").addClass(event.type);

        setTimeout(function(){
            Session.set("module.eventMessages", {});
            $(".js-event-message").removeClass(event.type);
        }, event.time)
    }); */

});

Template.moduleEventMessages.helpers({
    'event': function(){
        //msg
        //time
        //type

        return Session.get("module.eventMessages");
    }
});


Template.moduleEventMessages.events({

});