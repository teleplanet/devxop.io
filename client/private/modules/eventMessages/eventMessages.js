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

notifyMessageConfirm = function(msg, type, callback){
    Session.set("module.eventMessages", {msg: msg, type: type, time: time})

    if ($("." + type)[0]){
        // Do something if class exists
        $(".js-event-message").removeClass("." + type);
    }

    //$(".js-event-message").toggleClass(type);

    
}

Template.moduleEventMessages.onRendered(function(){
    Session.set("module.eventMessages", {});

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