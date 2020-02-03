/* Router.route('/api/display', { where: 'server' }).get(function () {
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
            if (selected == "static") {
                let img = Images.findOne({ "_id": device.display_types[selected].image });

                if (img) {
                    let response = "<html style='padding: 0; margin: 0;    background-color: rgb(34, 34, 34);'><body style='padding: 0; margin: 0;'> <script> document.addEventListener('DOMContentLoaded', function(){ Android.resetWebview(); videoComplete = function(){ Android.requestVideo();} }); </script> <img style='width: 100%; height: 100%; image-rendering: optimizeQuality; background-repeat: no-repeat; background-position: center; background-clip: content-box; background-size: cover; display: block; position: fixed; top: 0; bottom: 0;' src='"+img.url()+"'></body></html>"
                    //res.end("<html style='padding: 0; margin: 0;'><body style='padding: 0; margin: 0;'> <img style='width: 100%; height: 100%; image-rendering: optimizeQuality; background-repeat: no-repeat; background-position: center; background-clip: content-box; background-size: cover; display: block; position: fixed; top: 0; bottom: 0;' src='"+img.url()+"'></body></html>");
                
                    res.end(response);
                }
            } else if (selected == "video") {
                let video = Videos.findOne({ "_id": device.display_types[selected].video });

                if (video) {
                    let videoUrl = video.url();

                    let response2 = "<html style='padding: 0; margin: 0; background-color: rgb(34, 34, 34);'><body style='padding: 0; margin: 0;'> <style> .progress-wrapper { display: flex; height: 100vh; align-items: center; justify-content: center; vertical-align: middle; } .progress-bar { width: 80%; height: 15px; border-radius: 15px; box-sizing: border-box; background-color: #606dbc; float: left; transition: all 200ms ease; } .progress-bar > .bar-value{ background-color: #465298; width: 4%; min-width: 4%; border-radius: 15px; max-width: 100%; height: 15px; float: left; position: relative; } </style> <div class='progress-wrapper'> <div class='progress-bar'> <div id='progress' class='bar-value'> </div> </div> </div> <script>document.addEventListener('DOMContentLoaded', function(){ Android.downloadVideo(document.location.origin + '"+ videoUrl +"'); videoComplete = function(){ Android.requestVideo();} } ); updateProgress = function(width){ width = width + '%'; document.getElementById('progress').style.width = width; } </script> </body></html>"
                    res.end(response2);
                }

            }else if (selected == "url") {

                    let response2 = "<html style='padding: 0; margin: 0;    background-color: rgb(34, 34, 34);'><body style='padding: 0; margin: 0;'> <script> document.addEventListener('DOMContentLoaded', function(){ Android.resetWebview(); videoComplete = function(){ Android.requestVideo();} }); </script> <iframe style='width: 100%; height: 100%; image-rendering: optimizeQuality; background-repeat: no-repeat; background-position: center; background-clip: content-box; background-size: cover; display: block; position: fixed; top: 0; bottom: 0;' src='"+device.display_types[selected].url+"'></iframe></body></html>"
                    res.end(response2);

            }else if (selected == "videoUrl") {

                let response2 = "<html style='padding: 0; margin: 0;    background-color: rgb(34, 34, 34);'> <header></header> <body style='padding: 0; margin: 0;'> <video style='width: 100%; height: 100%; image-rendering: optimizeQuality; background-repeat: no-repeat; background-position: center; background-clip: content-box; background-size: cover; display: block; position: fixed; top: 0; bottom: 0;' autoplay loop muted src='" + device.display_types[selected].url + "'> </video> </body> </html>";
                res.end(response2);

        }else if (selected == "code") {

            let response2 = ""+device.display_types[selected].code;
            res.end(response2);

    }
        } else {
            res.end("");
        }

    }else{
        res.end("");
    }


}); */

Router.route('/api/display', { where: 'server' }).get(function () {
    let req = this.request,
        res = this.response,
        params = getParams(req);

    let device = Devices.findOne({ "device_id": params.device_id });

    

    if (device) {
        Devices.update(device._id, {
            $set: {
                "update": false,
                "updated_stamp": new Date().getTime()
            }
        });
        let selected = device.selected_display;
        if (selected) {
            if (selected == "static") {
                let img = Images.findOne({ "_id": device.display_types[selected].image });

                if (img) {
                    
                    let imgUrl = img.url();

                    let data = {
                        display: "image",
                        url: imgUrl
                        /* orientation: device.display_types[selected].orientation */
                    };

                    resp(res, 200, data);
                }
            } else if (selected == "video") {
                let video = Videos.findOne({ "_id": device.display_types[selected].video });

                if (video) {
                    let videoUrl = video.url();

                    let data = {
                        display: "video",
                        url: videoUrl
                       /*  orientation: device.display_types[selected].orientation */
                    };

                    resp(res, 200, data);
                }

            }else{
                res.end("");
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
        Devices.update(exists._id, {
            $set: {
                "ping_stamp": new Date().getTime()
            }
        });

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
    //console.log(params);

    let user = Accounts.findUserByEmail(params.user);
    let result = Accounts._checkPassword(user, params.pass);

    if (result["error"]) {
        //invalid authentication attempt
        resp(res, 500, null);
    } else {
        let device = {
            device_id: params.device_id,
            stamp: new Date().getTime(),
            startup_stamp: new Date().getTime(),
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

    //console.log(params.device_id);


    let exists = Devices.findOne({ "device_id": params.device_id });

    //console.log(exists);

    if (exists) {
        Devices.update(exists._id, {
            $set: {
                "startup_stamp": new Date().getTime()
            }
        });
        resp(res, 200, null);
    } else {
        resp(res, 400, null);
    }


});