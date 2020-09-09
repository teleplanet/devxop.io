Template.videosEdit.onRendered(function () {
});

Template.videosEdit.helpers({
    'video': function () {
        let id = Session.get("video-edit");
        return Files.findOne({ "_id": id });
    },
    "deviceUsing": function () {
        let id = Session.get("video-edit");
        return Devices.findOne({ "selected_display": "video", "display_types.video.video": id });
    }
});

Template.videosEdit.events({
    'click .js-remove-video': function (event) {
        event.preventDefault();

        confirmPopup({ title: "Delete image", msg: "Your are attempting to permanantly delete this image. Are you sure?", btn_type: "danger", btn_msg: "Delete(danger)" }, function (canceled, confirmed) {
            if (canceled) {
                console.log("device deletion canceled.");
            } else if (confirmed) {
                let id = event.target.id;


                /* Files.remove(id); */
                Meteor.call("files.remove", id, function(err, result){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(result);
                    }
                });
            }
        })
    },
});