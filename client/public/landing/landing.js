
Template.landing.helpers({
    'messageSent': function(){
        return Session.get("landing.messageSent");
    }
});

Template.landing.events({
    'click .js-send-message': function(){
        let body = $("#message-body").val(),
            username = $("#message-username").val(),
            email = $("#message-email").val();

        
        if(!body || !username || !email){

        }else{
            let data = {
                "username": username,
                "body": body,
                "email": email,
                "stamp": new Date().getTime(),
            };

            Meteor.call("message.new", data, function(err, res){
                if(err){
                    console.log(err);
                    Session.set("landing.messageSent", false);
                }else{
                    console.log(res);
                    Session.set("landing.messageSent", true);
                }
            });
        }

    }
});