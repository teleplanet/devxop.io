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
                data["display_types." + type] = { "name": type };
            } else {
                if (!device.display_types[type]) {
                    data.display_types[type] = { "name": type };
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
            //object is empty, meaning device already contains all display types
            if (Object.keys(data.display_types).length !== Object.keys(device.display_types).length) {
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
    'getDisplay': function (selected, type) {

        if (typeof selected === "undefined") {
            return false;
        }

        if (selected.name == type && selected.name == "video") {
            setTimeout(function () {
                Session.set("module.videoUpload", Session.get("device-edit").display_types.video.video);
            }, 1000);

        }else if(selected.name == type && selected.name == "static"){
            setTimeout(function () {
                let img = Images.findOne({"_id": Session.get("device-edit").display_types.static.image});
                Session.set("module.imageUpload", img.url());
            }, 1000);
        }

        return selected.name == type;
    },
    'getItems': function (items) {
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

            if (diff > 40) { //ping stamp update every 30 seconds
                res = {class: "back-red", text: "Offline"};

                return res[key];
            } else {
                res = {class: "back-green", text: "Online"};

                return res[key];
            }

        } else {
            res = {class: "", text: "Unknown"};

            return res[key];
        }
    }
});

Template.deviceEdit.events({
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
    'click .js-add-item': function (event) {
        itemListModal(function (err, item) {
            if (err) {
                console.log("user cancele item selection");
            } else {
                let device = Session.get("device-edit");
                let display = Session.get("module.selectedDisplay");


                if (typeof device.display_types[display]["items"] === "undefined") {
                    device.display_types[display]["items"] = [item._id];
                } else {
                    device.display_types[display]["items"].push(item._id)
                }

                let data = {
                    "display_types": device.display_types
                };

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
    },
    'click .js-display-item-remove': function (event) {
        let device = Session.get("device-edit");
        let itemId = $(event.target).data('item-id');

        let display = Session.get("module.selectedDisplay");

        console.log(itemId);

        let displayItems = [];
        if (typeof device.display_types[display]["items"] !== "undefined") {
            displayItems = device.display_types[display]["items"];

            device.display_types[display]["items"] = [];

            console.log(device);
            for (let i = 0; i < displayItems.length; i++) {
                if (displayItems[i] === itemId) {
                    console.log(displayItems[i] + " " + itemId);
                } else {
                    //data.display_items.push(displayItems[i]);
                    device.display_types[display]["items"].push(displayItems[i])
                }
            }

            let data = {
                "display_types": device.display_types
            };

            Meteor.call("devices.edit", device._id, data, function (err, data) {
                if (err)
                    console.log(err);

                console.log("item updated");
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
    'change .js-url-edit':function(event){
        let url = $(event.target).val();

        let display = Session.get("module.selectedDisplay");

        if (display == "url") {
            let device = Session.get("device-edit");

            let data = {
                "display_types": device.display_types
            };


            data.display_types[display]["url"] = url;

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
    'change .js-code-edit':function(event){
        let code = $(event.target).val();

        let display = Session.get("module.selectedDisplay");

        if (display == "code") {
            let device = Session.get("device-edit");

            let data = {
                "display_types": device.display_types
            };


            data.display_types[display]["code"] = code;

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
    }
});
