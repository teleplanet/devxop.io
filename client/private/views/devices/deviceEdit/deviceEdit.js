/* var image; */

Template.deviceEdit.onRendered(function () {
    let device = Session.get("device-edit");

    if (device) {
        let display = DisplayTemplates.findOne({ "_id": device["selected_display"] });
        if (display) {
            Session.set("live-display", display);
            Session.set("module.selectedDisplay", display["name"]);
        }
    }


    //"http://localhost:3000"
    //$('.device-template-load').load(document.location.origin+ "/display" + template.name.capitalize());
    console.log(device.auth.access_token)
    console.log("Device link at:" + document.location.origin + "/display?deviceId=" + device["device_id"] + "&accessToken=" + device.auth.access_token);
});




Template.deviceEdit.helpers({
    'deviceUrl': function(){
        let device = Session.get("device-edit");
        return document.location.origin + "/display?deviceId=" + device["device_id"] + "&accessToken=" + device.auth.access_token;
    },
    'liveDisplay': function(){
        return Session.get("live-display");
    },
    'device': function () {
        return Session.get("device-edit");
    },
    'templateLoad': function () {
        return Session.get("template-load");
    },
    'hasDisplay': function () {
        let display = Session.get("module.selectedDisplay");

        if (display) {
            let device = Session.get("device-edit");
            let display = Session.get("module.selectedDisplay");

            displayTemplate = DisplayTemplates.findOne({ "name": display, "user_id": Meteor.userId(), "device_id": device._id });

            if (!displayTemplate) {
                //console.log("There is no selected display template! Creating....");
                let data = {
                    "name": display,
                    "static_image": "",
                    "display_items": [],
                    "user_id": Meteor.userId(),
                    "device_id": device._id
                };



                Meteor.call("display.templates.insert", data, function (err, templateId) {
                    if (err) {
                        console.log(err);
                    } else {
                        //if device does not have any selected device => SET ONE
                        if (!device.selected_display) {
                            let data = {
                                "selected_display": templateId
                            }
                            Meteor.call("devices.edit", device._id, data, function (err, data) {
                                if (err)
                                    console.log(err);
                            });
                        }

                        //console.log("Display template created!");
                    }
                });
            }

            return true;
        } else {
            return false;
        }
    },
    'selectedDisplayItems': function () {
        let device = Session.get("device-edit");
        let display = Session.get("module.selectedDisplay");

        displayTemplate = DisplayTemplates.findOne({ "name": display, "user_id": Meteor.userId(), "device_id": device._id });

        if (displayTemplate) {
            let result = Items.find({ "_id": { "$in": displayTemplate.display_items } }).fetch();

            return result;
        } else {
            return [];
        }
    },
    'displayTemplateVisible': function () {
        let device = Session.get("device-edit");
        let display = Session.get("module.selectedDisplay");

        if (!display || !device) {
            return false;
        } else {
            let displayTemplate = DisplayTemplates.findOne({ "_id": device["selected_display"], "name": display });
            if (!displayTemplate) {
                return false;
            } else {
                return true;
            }
        }
    },
    'staticDisplay': function () {
        let device = Session.get("device-edit");
        let display = Session.get("module.selectedDisplay");

        if (display == "static") {
            let displayTemplate = DisplayTemplates.findOne({ "name": display, "device_id": device._id });

            //console.log(displayTemplate);

            setTimeout(function(){
                Session.set("module.imageUpload", displayTemplate.static_image);
            }, 1000);
            

            return true;
        }else{
            return false;
        }

        
    },
    'videoDisplay': function () {
        let device = Session.get("device-edit");
        let display = Session.get("module.selectedDisplay");

        if (display == "video") {
            let displayTemplate = DisplayTemplates.findOne({ "name": display, "device_id": device._id });

            setTimeout(function(){
                Session.set("module.videoUpload", displayTemplate["video_id"]);
            }, 1000);
            

            return true;
        }else{
            return false;
        }

        
    }
});

Template.deviceEdit.events({
    'click .js-image-upload-event': function (event) {
        let display = Session.get("module.selectedDisplay");

        if (display == "static") {
            let device = Session.get("device-edit");
            let image = Session.get("module.imageUpload");
            let display = Session.get("module.selectedDisplay");

            displayTemplate = DisplayTemplates.findOne({ "name": display, "user_id": Meteor.userId(), "device_id": device._id });

            if (displayTemplate) {

                let data = {
                    "static_image": image
                };



                Meteor.call("display.templates.edit", displayTemplate._id, data, function (err, data) {
                    if (err){
                        console.log(err)
                        notifyMessage("Failed item update", "danger");
                    }else{
                        notifyMessage("Item successfully updated", "success");
                    }
                });
            } else {

                let data = {
                    "name": display,
                    "static_image": image,
                    "user_id": Meteor.userId(),
                    "device_id": device._id
                };



                Meteor.call("display.templates.insert", data, function (err, data) {
                    if (err){
                        console.log(err)
                        notifyMessage("Failed item update", "danger");
                    }else{
                        notifyMessage("Item successfully updated", "success");
                    }
                    
                });
            }
        }
    },
    'click .js-video-upload-event': function (event) {
        let display = Session.get("module.selectedDisplay");

        if (display == "video") {
            let device = Session.get("device-edit");
            let video = Session.get("module.videoUpload");
            let display = Session.get("module.selectedDisplay");

            displayTemplate = DisplayTemplates.findOne({ "name": display, "user_id": Meteor.userId(), "device_id": device._id });

            if (displayTemplate) {

                let data = {
                    "video_id": video
                };



                Meteor.call("display.templates.edit", displayTemplate._id, data, function (err, data) {
                    if (err){
                        console.log(err)
                        notifyMessage("Failed item update", "danger");
                    }else{
                        notifyMessage("Item successfully updated", "success");
                    }
                });
            } else {

                let data = {
                    "name": display,
                    "video_id": video,
                    "user_id": Meteor.userId(),
                    "device_id": device._id
                };



                Meteor.call("display.templates.insert", data, function (err, data) {
                    if (err){
                        console.log(err)
                        notifyMessage("Failed item update", "danger");
                    }else{
                        notifyMessage("Item successfully updated", "success");
                    }
                    
                });
            }
        }
    },
    'change .js-live-switch': function (event) {
        let data = {};
        let device = Session.get("device-edit");

        let display = Session.get("module.selectedDisplay");

        displayTemplate = DisplayTemplates.findOne({ "name": display, "user_id": Meteor.userId(), "device_id": device._id });

        if (!displayTemplate) {
            console.log("plates are required first!");
            return;
        }


        isCheckbox = $(event.target).is(':checkbox');
        if (isCheckbox) {
            if ($(event.target).is(":checked")) {
                data["selected_display"] = displayTemplate._id;
            } else {
                data["selected_display"] = "";
            }
        } else {
            console.log("not checkbox");
        }

        Meteor.call("devices.edit", device._id, data, function (err, data) {
            if (err){
                console.log(err)
                notifyMessage("An error occurred trying to change template", "danger");
            }else{
                notifyMessage("Display template status changed!", "success");
            }

        });
    },
    'click .js-item-selected': function (event) {
        let device = Session.get("device-edit");
        let item = Session.get("module.selecteditem");
        let display = Session.get("module.selectedDisplay");

        displayTemplate = DisplayTemplates.findOne({ "name": display, "user_id": Meteor.userId(), "device_id": device._id });

        if (displayTemplate) {
            displayTemplate.display_items.push(item._id)

            let data = {
                "display_items": displayTemplate.display_items
            };



            Meteor.call("display.templates.edit", displayTemplate._id, data, function (err, data) {
                if (err){
                    console.log(err)
                    notifyMessage("Failed item update", "danger");
                }else{
                    notifyMessage("Item successfully updated", "success");
                }
            });
        } else {

            let data = {
                "name": display,
                "display_items": [item._id],
                "user_id": Meteor.userId(),
                "device_id": device._id
            };



            Meteor.call("display.templates.insert", data, function (err, data) {
                if (err){
                    console.log(err)
                    notifyMessage("Failed item update", "danger");
                }else{
                    notifyMessage("Item successfully updated", "success");
                }
            });
        }
    },
    'change .deviceEdit': function (event) {
        let device = Session.get("device-edit");
        let value = $(event.target).val();
        let key = $(event.target).data('key');
        let id = device._id;

        console.log(value);
        let data = {};
        data[key] = value;


        isCheckbox = $(event.target).is(':checkbox');
        if (isCheckbox) {
            if ($(event.target).is(":checked")) {
                data["visible"] = true;
            } else {
                data["visible"] = false;
            }
        } else {
            //console.log("not checkbox");
        }

        Meteor.call("devices.edit", id, data, function (err, data) {
            if (err){
                console.log(err)
                notifyMessage("Failed item update", "danger");
            }else{
                notifyMessage("Item successfully updated", "success");
            }
        });

    },
    'click .js-display-item-remove': function (event) {
        let device = Session.get("device-edit");
        let itemId = $(event.target).data('item-id');

        let display = Session.get("module.selectedDisplay");

        displayTemplate = DisplayTemplates.findOne({ "name": display, "user_id": Meteor.userId(), "device_id": device._id });

        let displayItems = displayTemplate.display_items;

        let data = {
            "display_items": []
        };


        for (let i = 0; i < displayItems.length; i++) {
            if (displayItems[i] === itemId) {
                console.log(displayItems[i] + " " + itemId);
            } else {
                data.display_items.push(displayItems[i]);
            }
        }

        Meteor.call("display.templates.edit", displayTemplate._id, data, function (err, data) {
            if (err)
                console.log(err);

            console.log("item updated");
        });

    },
});
