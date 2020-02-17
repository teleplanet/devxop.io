/* var image; */

var pingInterval;
var flagCodeInit = false;

Template.deviceEdit.onRendered(function () {
    let device = Session.get("device-edit");
    flagCodeInit = false;

    if (device) {

        Session.set("module.selectedDisplay", device.selected_display);

        /* ########### DEVICE DISPLAY TYPES SETUP ################ */
        let data = {
            display_types: device["display_types"]
        };

        for (let i = 0; i < displayTypes.length; i++) {
            let type = displayTypes[i];

            if (typeof device["display_types"] === 'undefined') {
                data["display_types." + type] = { "name": type, "orientation": "landscape" };
            } else {
                if (!device.display_types[type]) {
                    console.log("adding new type from array");
                    data.display_types[type] = { "name": type, "orientation": "landscape" };
                }
            }

        }

        if (typeof device["display_types"] === 'undefined') {
            //display types are missing... adding
            Meteor.call("devices.edit", device._id, data, function (err, data) {
                if (err)
                    console.log(err);

                console.log("device updated");
            });
        } else {
            //object is empty, meaning device already contains some display types
            if (Object.keys(data.display_types).length != Object.keys(Session.get("device-edit").display_types).length) {
                console.log("updating display types");
                Meteor.call("devices.edit", device._id, data, function (err, data) {
                    if (err)
                        console.log(err);

                    console.log("device updated");
                });
            }
        }
    }



});



Template.deviceEdit.helpers({
    'data': function () {
        let data = {
            "status": "",
            "startup_time": 0,
            "running_time": 0,
            "display": "",
            "device": null,
            "edit_display": "static",
            "static_thumb": "",
            "video_name": "",
            "template": "",
            "code": "",
        }

        data.device = Session.get("device-edit");
        if (data.device) {
            /* SET STATUS */
            let diff = getDiffSeconds(new Date().getTime(), data.device.ping_stamp);
            if (diff < 30) { //ping stamp update every 30 seconds
                data.status = "Online"
            } else {
                data.status = "Offline"
            }

            /* SET STARTUP TIME */
            data.startup_time = moment(new Date(data.device.startup_stamp), 'DD-MM-YYYY h:mm:ss').toString();

            /* RUNTIME */
            /* var ms = moment(new Date().getTime(), "DD/MM/YYYY HH:mm:ss").diff(moment(new Date(device.startup_time).getTime(), "DD/MM/YYYY HH:mm:ss"));
            var d = moment.duration(ms);

            console.log(d.days(), d.hours(), d.minutes(), d.seconds());
            data.running_time = d.days(), d.hours(), d.minutes(), d.seconds(); */

            /* DISPLAY */
            data.display = data.device.selected_display;

            data.edit_display = Session.get("module.selectedDisplay");

            /* GET IMAGE */
            let image = Images.findOne({ _id: data.device.display_types.static.image });
            if (image) {
                data.static_thumb = Thumbnails.findOne({ _id: image.image_thumb }).url();

            }

            /* GET Video */
            let video = Videos.findOne({ _id: data.device.display_types.video.video });
            if (video) {
                data.video_name = video.original.name

            }

            /* GET TEMPLATE */
            let template = Images.findOne({ _id: data.device.display_types.template.image });
            if (template) {
                data.template = template.url();

            }


            data.code = data.device.display_types.code.code

        }

        //console.log(data);

        return data;


    },
    'deviceUrl': function () {
        let device = Session.get("device-edit");
        return document.location.origin + "/display?override=" + device["device_id"];
    },
    'device': function () {
        return Session.get("device-edit");
    },
    'displayType': function () {
        let device = Session.get("device-edit");

        //console.log(device.display_types[Session.get("module.selectedDisplay")]);
        return device.display_types[Session.get("module.selectedDisplay")];
    },
    'getDisplay': function (type) {
        let selected = Session.get("module.selectedDisplay");

        if (typeof selected === "undefined") {
            return false;
        }

        /* if(selected == "code" && !flagCodeInit){
            flagCodeInit = true;
            setTimeout(function(){
                var editor = CodeMirror.fromTextArea(document.getElementById("code-textarea"), {
                    lineNumbers: true
                  });
            }, 500);
        } */

        return selected == type;
    },
    'getItems': function (items) {
        if (!items)
            return [];

        return Items.find({ "_id": { "$in": items } }).fetch();
    },
    'selectedDisplayIsLive': function () {
        let device = Session.get("device-edit");

        if (Session.get("module.selectedDisplay") == device.selected_display) {
            return true
        } else {
            return false;
        }

    },
    'getStatus': function (device, key) {
        if (device && device["ping_stamp"]) {
            let time1 = device.ping_stamp;
            let time2 = new Date().getTime();
            let res;

            let diff = getDiffSeconds(time2, time1);

            if (diff > 130) { //ping stamp update every 30 seconds
                res = "offline";

                return res;
            } else {
                res = "online";

                return res;
            }

        } else {
            res = "unknown";

            return res;
        }
    }
});

Template.deviceEdit.events({
    'click .js-force-update': function (event) {

        $(event.target).hide();

        setTimeout(function(){
            $(event.target).show();
        }, 1500);

        let device = Session.get("device-edit");
        Devices.update(device._id, {
            $set: {
                "update": true,
                "system_force": true,
            }
        });
    },
    'click .js-select-image': function (event) {
        event.preventDefault();

        imageListModal(function (err, image) {
            if (image) {
                let device = Session.get("device-edit");
                Devices.update(device._id, {
                    $set: {
                        "display_types.static.image": image._id,
                        "update": true
                    }
                });
            }
        });

        return false;
    },
    'click .js-select-template': function (event) {
        event.preventDefault();

        templateListModal(function (err, template) {
            if (template) {
                let device = Session.get("device-edit");
                Devices.update(device._id, {
                    $set: {
                        "display_types.template.image": template.image,
                        "update": true
                    }
                });
            }
        });

        return false;
    },
    'click .js-select-video': function (event) {
        event.preventDefault();

        videoListModal(function (err, video) {
            if (video) {
                let device = Session.get("device-edit");
                Devices.update(device._id, {
                    $set: {
                        "display_types.video.video": video._id,
                        "update": true
                    }
                });
            }
        });

        return false;
    },
    'click .js-live-switch': function (event) {
        let data = {};
        let device = Session.get("device-edit");
        let display = Session.get("module.selectedDisplay");

        data["selected_display"] = display;
        data["update"] = true;

        Devices.update(device._id, {
            $set: data
        });
    },

    'click .js-device-remove': function () {
        let id = Session.get("device-edit")["_id"];

        confirmPopup({ title: "Delete device access", msg: "Your are attempting to permanantly delete this device access. Are you sure?", btn_type: "danger", btn_msg: "Delete(danger)" }, function (canceled, confirmed) {
            if (canceled) {
                console.log("device deletion canceled.");
            } else if (confirmed) {
                Meteor.call("devices.remove", id, function (err, data) {
                    if (err) {
                        console.log(err)
                        notifyMessage("Failed device remove", "danger");
                    } else {
                        notifyMessage("Device has been removed", "success");
                        Router.go("/");
                    }

                });
            }
        })
    },
    'change .js-code-edit':function(event){
        let code = $(event.target).val();
        //console.log(code);

        let display = Session.get("module.selectedDisplay");

        if (display == "code") {
            let device = Session.get("device-edit");

            let data = {
                "display_types": device.display_types
            };

            data["update"] = true;
            data.display_types[display]["code"] = code;

            Devices.update(device._id, {
                $set: data
            });

            /* Meteor.call("devices.edit", device._id, data, function (err, data) {
                if (err) {
                    console.log(err)
                    notifyMessage("Failed image upload", "danger");
                } else {
                    notifyMessage("Image successfully updated", "success");
                }
            }); */
        }
    },
    'change .deviceEdit': function (event) {
        let device = Session.get("device-edit");
        let value = $(event.target).val();
        let key = $(event.target).data('key');

        let data = {};
        data[key] = value;

        data["update"] = true;


        Devices.update(device._id, {
            $set: data
        });

    },
});
