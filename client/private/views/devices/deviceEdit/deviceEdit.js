/* var image; */

var pingInterval;

Template.deviceEdit.onRendered(function () {
    let device = Session.get("device-edit");

    if (device) {

        Session.set("module.selectedDisplay", device.selected_display);

        /* ########### DEVICE DISPLAY TYPES SETUP ################ */
        let data = {
            display_types: device.display_types
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

        if (typeof device["display_types"] === 'undefined' || Object.keys(data.display_types).length !== Object.keys(device.display_types).length) {
            //display types are missing... adding
            Meteor.call("devices.edit", device._id, data, function (err, data) {
                if (err)
                    console.log(err);

                console.log("device updated");
            });
        } else {
            //object is empty, meaning device already contains all display types
        }
    }



});



Template.deviceEdit.helpers({
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

        return selected.name == type;
    },
    'selectedDisplayIsLive': function () {
        let device = Session.get("device-edit");

        if (Session.get("module.selectedDisplay") == device.selected_display) {
            return true
        } else {
            return false;
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
                }else{
                    device.display_types[display]["items"].push(item._id)
                }

                
                let data = {
                    "display_types": device.display_types[display]
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
});
