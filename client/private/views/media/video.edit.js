Template.videosEdit.onRendered(function () {

    Session.watch("video-edit", function () {
        console.log("video on load")

        let id = Session.get("video-edit");

        if (id) {
            $("#video-edit").on("loadeddata", function () {
                setTimeout(function () {
                    console.log("capturing image");
                    var canvas = document.createElement("canvas");
                    var video = $("#video-edit").get(0);
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    canvas.getContext('2d')
                        .drawImage(video, 0, 0, canvas.width, canvas.height);

                    /* var img = document.createElement("img");
                    img.src = canvas.toDataURL();
                    $output.prepend(img); */

                    var data =  canvas.toDataURL();

                    scaleImage(data, 720, 480, function (canvas) {
                        // save canvas image as data url (png format by default)
                        //var blob = dataURItoBlob(canvas.toDataURL());

                        var blob = dataURItoBlob(canvas.toDataURL("image/jpeg"));

                        new ImageCompressor(blob, {
                            quality: 1,
                            width: 720,
                            height: 480,
                            success(result) {
                                imageUploading["progress"] = 50;
                                Session.set("image-uploading", imageUploading);

                                var thumbObj = new FS.File(result);
                                thumbObj['user_id'] = Meteor.userId();
                                Thumbnails.insert(thumbObj, function (err, thumbnail) {
                                    // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                                    if (err) {
                                        console.log(err);
                                    } else {

                                        Images.update(imageObj._id, {
                                            $set: {
                                                "image_thumb": thumbnail._id,
                                                "download_complete": true,
                                            }
                                        })
                                    }
                                });

                            },
                            error(e) {
                                console.log(e.message);
                            },
                        });
                    });
                }, 2000);
            });
        }

        //captureImage();

    })
    /* $("#video-edit").on("loadeddata", function () {
        let id = Session.get("video-edit");

        if (id) {
            setTimeout(captureImage, 1000);
        }

        //captureImage();
    }); */
});

captureImage = function () {
    console.log("video on load")
    $("#video-edit").on("loadeddata", function () {
        let id = Session.get("video-edit");

        if (id) {
            setTimeout(function () {
                console.log("capturing image");
                var canvas = document.createElement("canvas");
                var video = $("#video-edit").get(0);
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d')
                    .drawImage(video, 0, 0, canvas.width, canvas.height);

                /* var img = document.createElement("img");
                img.src = canvas.toDataURL();
                $output.prepend(img); */

                console.log(canvas.toDataURL());
            }, 1000);
        }

        //captureImage();
    });

};

Template.videosEdit.helpers({
    'video': function () {
        let id = Session.get("video-edit");
        return Videos.findOne({ "_id": id });
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


                Videos.remove(id);
            }
        })
    },
});