Template.devices.onRendered(function () {
    Session.set("module.selectedDisplay", "");
});

Template.devices.helpers({
    'devicesList': function () {
        return Devices.find({ "auth.user_id": Meteor.userId() }).fetch();
    },
    'platesList': function () {
        return Plates.find().fetch();
    },
    'getItem': function (itemId, key) {
        return Plates.findOne({ "_id": itemId })[key];
    },
    'getItemImage': function (itemId) {
        return Plates.findOne({ "_id": itemId }).image;
    },
    'ifDisplay': function(){
        let display = Session.get("module.selectedDisplay");

        if(display){
            return true;
        }else{
            return false;
        }
    },
    'getSelectedDisplay': function(deviceId){
        let device = Devices.findOne({ "_id": deviceId});
        let displayTemplate = DisplayTemplates.findOne({ "_id": device.selected_display});

        return displayTemplate;
    },
    'displayTemplateVisible':function(deviceId){
        let display = Session.get("module.selectedDisplay");
        let device = Devices.findOne({ "_id": deviceId});
        let displayTemplate = DisplayTemplates.findOne({ "_id": device.selected_display, "name": display});

        if(displayTemplate){
            return true;
        }else{
            return false;
        }
    },
    'selectedDisplayItems': function (deviceId) {
        let display = Session.get("module.selectedDisplay");

        displayTemplate = DisplayTemplates.findOne({ "name": display, "user_id": Meteor.userId(), "device_id": deviceId });

        if (displayTemplate) {
            return displayTemplate.display_items;
        } else {
            return [];
        }
    }
});

Template.devices.events({
    'click #plateSelect': function () {
        //Session.set("plate2Info", this);

        $('#plateInfoInput').val("" + this.name + " " + this.kcal + "kcal");

        let deviceId = $(event.target).data('id');
        let itemId = this._id;

        let display = Session.get("module.selectedDisplay");

        displayTemplate = DisplayTemplates.findOne({ "name": display, "user_id": Meteor.userId(), "device_id": deviceId });

        if (displayTemplate) {
            displayTemplate.display_items.push(itemId)

            let data = {
                "display_items": displayTemplate.display_items
            };



            Meteor.call("display.templates.edit", displayTemplate._id, data, function (err, data) {
                if (err)
                    console.log(err);

                console.log("item updated");
            });
        }else{

            let data = {
                "name": display,
                "display_items": [itemId],
                "user_id": Meteor.userId(),
                "device_id": deviceId
            };



            Meteor.call("display.templates.insert", data, function (err, data) {
                if (err)
                    console.log(err);

                console.log("item updated");
            });
        }
    },
    'click .removeDisplayItem': function (event) {
        let deviceId = $(event.target).data('id');
        let itemId = $(event.target).data('item-id');

        let display = Session.get("module.selectedDisplay");

        displayTemplate = DisplayTemplates.findOne({ "name": display, "user_id": Meteor.userId(), "device_id": deviceId });

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
    'click .btn-collapse': function (event) {
        let index = $(event.target).val();

        $('.collapse').collapse('hide');
        $('#collapse' + index).collapse('toggle');
    },
    'change .deviceEdit': function (event) {
        let value = $(event.target).val();
        let key = $(event.target).data('key');
        let id = $(event.target).data('id');

        console.log(value);
        let data = {};
        data[key] = value;


        isCheckbox = $(event.target).is(':checkbox');
        if(isCheckbox){
            if ( $(event.target).is(":checked") ){
                data["visible"] = true;
            }else{
                data["visible"] = false;
            }
        }else{
            console.log("not checkbox");
        }

        Meteor.call("devices.edit", id, data, function (err, data) {
            if (err)
                console.log(err);

            console.log("item updated");
        });

    },
    'change .displayEdit': function (event) {
        let deviceId = $(event.target).data('device-id');
        let data = {};

        let display = Session.get("module.selectedDisplay");

        displayTemplate = DisplayTemplates.findOne({ "name": display, "user_id": Meteor.userId(), "device_id": deviceId});

        if(!displayTemplate){
            console.log("plates are required first!");
            return;
        }
        

        isCheckbox = $(event.target).is(':checkbox');
        if(isCheckbox){
            if ( $(event.target).is(":checked") ){
                data["selected_display"] = displayTemplate._id;
            }else{
                data["selected_display"] = "";
            }
        }else{
            console.log("not checkbox");
        }

        Meteor.call("devices.edit", deviceId, data, function (err, data) {
            if (err)
                console.log(err);

            console.log("item updated");
        });

    },
});