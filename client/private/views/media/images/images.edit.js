
Template.imagesEdit.onRendered(function () {
});

Template.imagesEdit.helpers({
    'image': function () {
        let id = Session.get("image-edit");
        return Images.findOne({ "_id": id });
    },
    "deviceUsing": function(){
        let id = Session.get("image-edit");
        return Devices.findOne({"selected_display": "static", "display_types.static.image": id});
    }
});

Template.imagesEdit.events({
    'click .js-remove-image': function (event) {
        event.preventDefault();

        confirmPopup({ title: "Delete image", msg: "Your are attempting to permanantly delete this image. Are you sure?", btn_type: "danger", btn_msg: "Delete(danger)" }, function (canceled, confirmed) {
            if (canceled) {
                console.log("device deletion canceled.");
            } else if (confirmed) {
                let id = event.target.id;


                Images.remove(id);
            }
        })
    },
});