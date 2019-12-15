Router.route('/v1/access', { where: 'server' }).post(function () {
    let req = this.request,
        res = this.response,
        params = getParams(req),
        headers = req.headers;

    let user = Accounts.findUserByEmail(params.user);
    let result = Accounts._checkPassword(user, params.pass);

    console.log(params);

    if (result["error"]) {
        //invalid authentication attempt
        resp(res, 401);
    } else {

        //create device
        device = {
            device_id: params.device_id,
            access_token: Random.secret(),
            stamp: new Date().getTime(),
            update_stamp: new Date().getTime(),
            user_id: user._id
        }

        Devices.insert(device);


        resp(res, 200, device);
    }

    resp(res, 200, "OK");
});

Router.route('/v1/heartbeat', { where: 'server' }).get(function () {
    let req = this.request,
        res = this.response,
        params = getParams(req),
        headers = req.headers;


    if(!headers["x-devxop-access"] && !headers["x-devxop-user"] && !headers["x-devxop-device"]){
        resp(res, 200, "OK");
    }

    console.log("############## Heartbeat ##############");

    let device = Devices.findOne({
        "access_token": headers["x-devxop-access"],
        "user_id": headers["x-devxop-user"],
        "device_id": headers["x-devxop-device"]
    }); 

    if(device){
        //console.log("Found Device! Recording coordinates...");
        /* let lat = parseFloat(params.lat.substring(0, params.lat.length));
        let long = parseFloat(params.long.substring(0, params.long.length)); */

        Heartbeats.insert({
            "user_id": headers["x-devxop-user"],
            "device_id": headers["x-devxop-device"],
            "geo": {
                "lat": params.lat,
                "long": params.long
            },
            "stamp": new Date().getTime()
        });
    }
    

    /* var device = Devices.findOne({"auth.access_token": headers["x-access-token"], "auth.user_id": headers["x-user-id"] });

    if(device){
        Meteor.call("location.updateUserLocation", parseFloat(params.lat), parseFloat(params.long), headers["x-user-id"]);
    }else{
        console.log("Access is denied!");
        console.log(headers)
    } */

    resp(res, 200, "OK");
});
