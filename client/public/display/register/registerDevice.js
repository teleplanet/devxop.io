

Template.registerDevice.events({
    'click .js-register-device': function (event) {
        event.preventDefault();
        let user = $(".js-input-user").val();
        let pass = $(".js-input-password").val();
        let id = Session.get("fingerprint");//Router.current().params.query.override;
        
        let data = {
            "user": user,
            "pass": pass,
            "id": id
        };

        if (!id || !user || !pass) {
            console.log("no values inserted.");
            console.log(JSON.stringify(data));
            return;
        }



        Meteor.call("devices.register", data, function (err, data) {
            if (err || !data) {
                console.log(err);
                console.log(data);
            } else {
                console.log(data);
            }
        });

        return;
    }
});