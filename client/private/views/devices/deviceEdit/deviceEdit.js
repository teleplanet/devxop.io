/* var image; */

var pingInterval;

Template.deviceEdit.onRendered(function () {
    let device = Session.get("device-edit");

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
        }

        console.log(data);

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
    'click .js-select-image': function(event){
        event.preventDefault();

        imageListModal(function(err, image){
            if(image){
                let device = Session.get("device-edit");
                Devices.update(device._id, {
                    $set: {
                        "display_types.static.image": image._id
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

        Meteor.call("devices.edit", device._id, data, function (err, data) {
            if (err) {
                console.log(err)
                notifyMessage("An error occurred trying to change template", "danger");
            } else {
                notifyMessage("Display template status changed!", "success");
            }

        });
    },
    'click .js-image-upload-event': function (event) {
        let display = Session.get("module.selectedDisplay");

        if (display == "static") {
            let device = Session.get("device-edit");
            let image = Session.get("module.imageUpload");

            let data = {
                display_types: device.display_types
            };

            var imageObj = new FS.File(dataURItoBlob(image));
            imageObj['user_id'] = Meteor.userId();
            Images.insert(imageObj, function (err, img) {
                // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                if (err) {
                    console.log(err);
                } else {
                    console.log(img);

                    if (typeof data.display_types[display]["image"] !== "undefined") {
                        Images.remove({ "_id": data.display_types[display].image }, function () {
                            console.log("previous image removed.");
                        });
                    }

                    data.display_types[display]["image"] = img._id;

                    Meteor.call("devices.edit", device._id, data, function (err, data) {
                        if (err) {
                            console.log(err)
                            notifyMessage("Failed image upload", "danger");
                        } else {
                            notifyMessage("Image successfully updated", "success");
                        }
                    });

                }
            });
        }
    },
    'click .js-video-upload-event': function (event) {
        let display = Session.get("module.selectedDisplay");

        if (display == "video") {
            let device = Session.get("device-edit");
            let video = Session.get("module.videoUpload");

            let data = {
                "display_types": device.display_types
            };


            data.display_types[display]["video"] = video;

            Meteor.call("devices.edit", device._id, data, function (err, data) {
                if (err) {
                    console.log(err)
                    notifyMessage("Failed image upload", "danger");
                } else {
                    notifyMessage("Image successfully updated", "success");
                }
            });
        }
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
    'change .deviceEdit': function (event) {
        let device = Session.get("device-edit");
        let value = $(event.target).val();
        let key = $(event.target).data('key');

        let data = {};
        data[key] = value;


        Devices.update(device._id, {
            $set: data
        });

    },
});
