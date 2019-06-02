Router.route('/ping', { where: 'server' }).get(function () {
    let req = this.request,
        res = this.response,
        params = getParams(req),
        headers = req.headers;
    
    console.log("############## Location Heartbeat ##############");

    var device = Devices.findOne({"auth.access_token": headers["x-access-token"], "auth.user_id": headers["x-user-id"] });

    if(device){
        Meteor.call("location.updateUserLocation", parseFloat(params.lat), parseFloat(params.long), headers["x-user-id"]);
    }else{
        console.log("Access is denied!");
        console.log(headers)
    }
    
    resp(res, 200, "OK")
});
