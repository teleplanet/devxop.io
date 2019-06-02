import SimpleSchema from 'simpl-schema';

var OAuth = Router;

OAuth.onBeforeAction(function () {
    //console.log(this.request);
    this.next();
});

const registerSchema = new SimpleSchema({
    device_type: String,
    device_id: String,
    operating_system: String
}).newContext();

OAuth.route('/oauth/register', { where: 'server' }).post(function () {
    let req = this.request,
        res = this.response,
        params = getParams(req);

    registerSchema.validate(params);
    if (!registerSchema.isValid()) {
        resp(res, 400);
    }

    var device = Devices.findOne({ device_id: params.device_id});
    if (device) {

        device["authorization_code"] = Random.secret();

        Devices.update({ _id: device._id }, {
            $set: {
                authorization_code: device.authorization_code,
                update_stamp: new Date().getTime()
            }
        });
    } else {
        //create device
        device = {
            device_id: params.device_id,
            authorization_code: Random.secret(),
            update_stamp: new Date().getTime(),
            operating_system: params.operating_system,
            device_type: params.device_type
        }

        Devices.insert(device);

        
    }
    
    resp(res, 200, device);

});

const authorizeSchema = new SimpleSchema({
    authorization_code: String,
    device_id: String,
    user: String,
    pass: String,
}).newContext();

OAuth.route('/oauth/authorize', { where: 'server' }).post(function () {
    let req = this.request,
        res = this.response,
        params = getParams(req);

    console.log(params);
    authorizeSchema.validate(params);
    if (!authorizeSchema.isValid()) {
        resp(res, 400, "The required fields are not present.");
    }

    //Validate that auth_code and device_id match
    var device = Devices.findOne({ device_id: params.device_id, authorization_code: params.authorization_code });
    if (device) {
        let user = Accounts.findUserByEmail(params.user);
        let result = Accounts._checkPassword(user, params.pass);

        if (result["error"]) {
            //invalid authentication attempt
            resp(res, 401);
        } else {
            var auth = {
                access_token: Random.secret(),
                refresh_token: Random.secret(),
                stamp: new Date().getTime(),
                user_id: user._id
            }

            Devices.update({ _id: device._id }, {
                $set: {
                    auth: auth,
                    update_stamp: new Date().getTime()
                }
            });

            resp(res, 200, auth);
        }


    } else {
        //no valid auth code provided
        resp(res, 401);
    }
});

const refreshSchema = new SimpleSchema({
    refresh_token: String,
    device_id: String,
    user_id: String
}).newContext();

OAuth.route('/oauth/refresh', { where: 'server' }).post(function () {
    let req = this.request,
        res = this.response,
        params = getParams(req);

    refreshSchema.validate(params);
    if (!refreshSchema.isValid()) {
        resp(res, 400, "The required fields are not present.");
    }

    //Validate that auth_code and device_id match
    var device = Devices.findOne({ device_id: params.device_id, "auth.refresh_token": params.refresh_token, "auth.user_id": params.user_id });
    if (device) {
        var auth = {
            access_token: Random.secret(),
            refresh_token: Random.secret(),
            stamp: new Date().getTime(),
            user_id: device.auth.user_id
        }

        Devices.update({ _id: device._id }, {
            $set: {
                auth: auth,
                update_stamp: new Date().getTime()
            }
        });

        resp(res, 200, auth);
    } else {
        //no valid auth code provided
        resp(res, 401);
    }
});