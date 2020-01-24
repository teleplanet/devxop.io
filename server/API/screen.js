Router.route('/api/display', { where: 'server' }).get(function () {
    let req = this.request,
        res = this.response,
        params = getParams(req);

    let device = Devices.findOne({ "device_id": params.device_id });

    Devices.update(device._id, {
        $set: {
            update: false,
        }
    });

    if (device) {
        let selected = device.selected_display;
        if (selected) {
            console.log(selected);
            if (selected == "static") {
                let img = Images.findOne({ "_id": device.display_types[selected].image });

                if (img) {
                    //console.log(img.url());

                    let imgUrl = "http://10.0.2.2:3000" + img.url();

                    let response = "<html><body> <script> document.addEventListener('DOMContentLoaded', function(){ Android.resetWebview(); videoComplete = function(){ Android.requestVideo();} }); </script> <img style='width: 100%; height: 100%; image-rendering: optimizeQuality; background-repeat: no-repeat; background-position: center; background-clip: content-box; background-size: cover; display: block; position: fixed; top: 0; bottom: 0;' src='"+img.url()+"'></body></html>"
                    //res.end("<html style='padding: 0; margin: 0;'><body style='padding: 0; margin: 0;'> <img style='width: 100%; height: 100%; image-rendering: optimizeQuality; background-repeat: no-repeat; background-position: center; background-clip: content-box; background-size: cover; display: block; position: fixed; top: 0; bottom: 0;' src='"+img.url()+"'></body></html>");
                
                    res.end(response);
                }
            } else if (selected == "video") {
                let video = Videos.findOne({ "_id": device.display_types[selected].video });

                if (video) {
                    let videoUrl = video.url();

                    let response = "<html style='background-color: #222;'> <header></header> <body>  </body> </html>"

                    let response2 = "<html><body> <script> document.addEventListener('DOMContentLoaded', function(){ Android.downloadVideo(document.location.origin + '"+ videoUrl +"'); videoComplete = function(){ Android.requestVideo();} } ); </script></body></html>"
                    res.end(response2);
                }

            }
        } else {
            res.end("");
        }

    }else{
        res.end("");
    }


});

Router.route('/api/device/update', { where: 'server' }).get(function () {

    let req = this.request,
        res = this.response,
        params = getParams(req);

    //console.log(params.device_id);


    let exists = Devices.findOne({ "device_id": params.device_id });


    if (exists) {


        resp(res, 200, "" + exists.update);
    } else {
        resp(res, 200, null);
    }


});


Router.route('/api/device/register', { where: 'server' }).post(function () {

    let req = this.request,
        res = this.response,
        params = getParams(req);

    let data = "hey";
    console.log(params);

    let user = Accounts.findUserByEmail(params.user);
    let result = Accounts._checkPassword(user, params.pass);

    if (result["error"]) {
        //invalid authentication attempt
        resp(res, 500, null);
    } else {
        let device = {
            device_id: params.device_id,
            stamp: new Date().getTime(),
            user_id: user._id
        };


        let exists = Devices.findOne({ "device_id": params.device_id });

        if (exists) {
            Devices.remove(exists._id);
        }

        Devices.insert(device);

        resp(res, 200, data);
    }

});


Router.route('/api/device/sync', { where: 'server' }).post(function () {

    let req = this.request,
        res = this.response,
        params = getParams(req);

    console.log(params.device_id);


    let exists = Devices.findOne({ "device_id": params.device_id });

    console.log(exists);

    if (exists) {
        resp(res, 200, null);
    } else {
        resp(res, 400, null);
    }


});