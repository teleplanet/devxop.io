Template.registerDevice.events({
    'click .js-register-device': function(event){
        event.preventDefault();
        let user = $(".js-input-user").val();
        let pass = $(".js-input-password").val();
        let id = Session.get("fingerprint");

        if(!id || !user || !pass){
            console.log("no values inserted.");
            return;
        }

            
        let data = {
            "user": user,
            "pass":pass,
            "id": id
        };

        Meteor.call("devices.register", data, function(err, data){
            if(err || !data){
                console.log(err);
                console.log(data);
            }else{
                console.log(data);
            }
        }); 

        return;
    }
});