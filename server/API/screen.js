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
        //console.log(device);
        Devices.update(device._id, {
            $set: {
                "update": false,
                "updated_stamp": new Date().getTime()
            }
        });

        if (device.system_force) {
            let data = {
                display: "restart",
                url: "",
                code: ""
                /* orientation: device.display_types[selected].orientation */
            };

            resp(res, 200, data);
            return;
        }

        let data = {
            display: "",
            url: "",
            code: "",
            /* orientation: device.display_types[selected].orientation */
        };

        if (typeof device["update_schedule"] !== "undefined" && device["update_schedule"] == true) {
            data.display = "schedule";

            let schedule = MultiscreenSchedule.findOne({ "user_id": device.user_id });
            if (schedule) {
                let scheduledDevice = schedule.devices[device._id];
                if (!scheduledDevice.confirmed_download) {
                    //send action to download video
                    let video = Videos.findOne({ "_id": scheduledDevice.video });
                    if (video) {
                        data["action"] = "download";
                        let videoUrl = video.url();
                        data.url = videoUrl
                    }
                } else {
                    //check if schedule is active and send time
                    if (schedule.active) {
                        //here send hour and minute for action
                        data["action"] = "time";
                        data["hour"] = schedule.schedule.hour;
                        data["minute"] = schedule.schedule.minute;
                        data["repeat"] = schedule.schedule.repetat;
                    }
                }

                Devices.update(device._id, {
                    $set: {
                        "update_schedule": false,
                    }
                });
            }



            resp(res, 200, data);
            return;
        }

        let selected = device.selected_display;
        if (selected) {
            if (selected == "static") {
                let img = Images.findOne({ "_id": device.display_types[selected].image });
                data.display = "image";
                if (img) {
                    let imgUrl = img.url();
                    data.url = imgUrl;
                }
            } else if (selected == "video") {
                let video = Videos.findOne({ "_id": device.display_types[selected].video });
                data.display = "video";
                if (video) {
                    let videoUrl = video.url();
                    data.url = videoUrl
                }
            } else if (selected == "code") {
                data.display = "webview";
                data.code = device.display_types[selected].code

            } else if (selected == "template") {
                let template = Templates.findOne({ "_id": device.display_types[selected].id });
                if (template) {
                    let img = Images.findOne({ "_id": template.image });
                    data.display = "image";
                    if (img) {
                        let imgUrl = img.url();
                        data.url = imgUrl;
                    }
                }


            }else if (selected == "imageText") {
                /* data.display = "webview";
                //data.code = device.display_types[selected].code
                let template = TemplatesImageText.findOne(device.display_types[selected].id);

                if(template){
                    //let html = '<html><header><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></header><body style="margin: 0; padding: 0"> '+ template["DOM"] +'</body></html>'
                    //data.code = html;
                    data.code = "http://devxop.ddns.net:3000/image/text/" + template._id + "/preview"
                }else{
                    data.code = "Data is unavailable. Error ocurred! Contact devxop.com";
                } */
                let template = TemplatesImageText.findOne({ "_id": device.display_types[selected].id });
                if (template) {
                    let img = Images.findOne({ "_id": template.image });
                    data.display = "image";
                    if (img) {
                        let imgUrl = img.url();
                        data.url = imgUrl;
                    }
                }

                
            }
        }

        resp(res, 200, data);
        return;

    } else {
        resp(res, 400, "");
        return;
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

Router.route('/api/device/schedule', { where: 'server' }).post(function () {

    let req = this.request,
        res = this.response,
        params = getParams(req);

    let device = Devices.findOne({ "device_id": params.device_id });
    if (device) {
        let schedule = MultiscreenSchedule.findOne({ "user_id": device.user_id });
        if (schedule) {
            data = schedule.devices;
            if (data[device._id]) {
                if (params.action == "confirmed_download") {
                    let bool = JSON.parse(params.value);
                    data[device._id].confirmed_download = bool;

                    MultiscreenSchedule.update(schedule._id, {
                        $set: { "devices": data }
                    });
                } else if (params.action == "status") {
                    data[device._id]["status"] = params.value;

                    if (params.value == "playing") {
                        MultiscreenSchedule.update(schedule._id, {
                            $set: {
                                "active": false,
                                "devices": data
                            }
                        });
                    } else {
                        MultiscreenSchedule.update(schedule._id, {
                            $set: { "devices": data }
                        });
                    }

                }

            }

        }
    }

    resp(res, 200, null);

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
                "startup_stamp": new Date().getTime(),
                "system_force": false
            }
        });
        resp(res, 200, null);
    } else {
        resp(res, 400, null);
    }


});

Router.route('/api/device/time', { where: 'server' }).get(function () {

    let req = this.request,
        res = this.response,
        params = getParams(req);

    //console.log(params.device_id);


    resp(res, 200, "" + new Date().getTime());

});