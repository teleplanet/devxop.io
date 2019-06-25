/* var image; */
Template.editItem.onRendered(function () {

    let item = Session.get("item-edit");
    let category = Categories.findOne({ "_id": item.category });

    //image = item.image;
    Session.set("module.selectedCategory", category);
    Session.set("module.imageUpload", item["image_thumb"]);

    /* //image upload change tracker
    this.sessionWatcher = Session.watch('module.imageUpload', function (value) {
        if (Session.get("module.imageUpload") != image) {
            let id = Session.get("item-edit")["_id"];
            let data = {};
            data['image'] = Session.get("module.imageUpload");
    
            Meteor.call("items.edit", id, data, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    image = Session.get("module.imageUpload");
                }
    
            });
        }
    }); */
});


Template.editItem.helpers({
    'item': function () {
        return Session.get("item-edit");
    }
});

Template.editItem.events({
    'click .js-image-upload-event': function(event){
        console.log(event);
        let image = Session.get("module.imageUpload");
        let thumb = Session.get("module.imageUploadThumb");
        let id = Session.get("item-edit")["_id"];

        let data = {};
        data['image'] = image;
        data['image_thumb'] = thumb;

        Meteor.call("items.edit", id, data, function (err, data) {
            if (err){
                console.log(err)
                notifyMessage("Failed item update", "danger");
            }else{
                notifyMessage("Item successfully updated", "success");
            }
        });
    },
    'click .js-category-selected': function(event){
        let key = "category";
        let value = Session.get("module.selectedCategory")["_id"];
        let id = Session.get("item-edit")["_id"];

        let data = {};
        data[key] = value;

        Meteor.call("items.edit", id, data, function (err, data) {
            if (err){
                console.log(err)
                notifyMessage("Failed item update", "danger");
            }else{
                notifyMessage("Item successfully updated", "success");
            }
        });
    },
    'change .plateEdit': function (event) {
        let value = $(event.target).val();
        let key = $(event.target).data('key');
        let id = Session.get("item-edit")["_id"];

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
            console.log("not checkbox");
        }


        Meteor.call("items.edit", id, data, function (err, data) {
            if (err){
                console.log(err)
                notifyMessage("Failed item update", "danger");
            }else{
                notifyMessage("Item successfully updated", "success");
            }
        });

    },
    'click .js-item-remove': function(){
        let id = Session.get("item-edit")["_id"];
        Meteor.call("items.remove", id, function (err, data) {
            if (err){
                console.log(err)
                notifyMessage("Failed item update", "danger");
            }else{
                notifyMessage("Item has been removed", "success");
                Router.go("/");
            }
            
        });
    }
});
