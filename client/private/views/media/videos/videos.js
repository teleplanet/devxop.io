captureImage = function() {
    let id = $(this.event.target).data("video");
    let video = Videos.findOne({ "_id": id });
    //&& typeof video.image_thumb == "undefined"
    if (video && typeof video.image_thumb == "undefined") {
        setTimeout(async function () {
            console.log("Video empty thumb... creating one.");
            var canvas = document.createElement("canvas");
            var video = document.getElementById("video-edit-" + id);
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d')
                .drawImage(video, 0, 0, canvas.width, canvas.height);

            let data = canvas.toDataURL("image/png");

            let resized = await resizeImage(data, 480, 360);

            var blob = dataURItoBlob(resized);

            new ImageCompressor(blob, {
                quality: 1,
                width: 480,
                height: 360,
                success(result) {

                    let exists = Thumbnails.findOne({ "video_id": id });
                    if (exists) Thumbnails.remove(exists._id);

                    var thumbObj = new FS.File(result);
                    thumbObj['user_id'] = Meteor.userId();
                    thumbObj['video_id'] = id;
                    Thumbnails.insert(thumbObj, function (err, thumbnail) {
                        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                        if (err) {
                            console.log(err);
                        } else {
                            Videos.update(id, {
                                $set: {
                                    "image_thumb": thumbnail._id,
                                }
                            })
                        }
                    });

                },
                error(e) {
                    console.log(e.message);
                },
            });
        }, 1000);
    }


};

Template.mediaVideos.onRendered(function () {
    var controller = Iron.controller();
    controller.render('videosEdit', { to: 'ui-side-panel' });
    Session.set("video-uploading", { status: false, progress: 0, name: "" });
});

Template.mediaVideos.helpers({
    'data': function () {
        //console.log("data was called..");
        let data = {
            videos: [],
            total: 0,
            storage: 0,
        };

        data.videos = Files.find({ "is_video": true }).fetch();
        data.total = data.videos.length;

        data.videos.forEach(function (video) {
            data.storage += video.file.size;
        });

        //data.storage = formatBytes(data.storage);

        //console.log(data);

        return data;
    },
    'videoUploading': function () {

        return Session.get("video-uploading");
    }
})

Template.mediaVideos.events({
    'click .js-select-video': function (event) {
        event.preventDefault();
        let videoId = $(event.currentTarget).data("video");

        Session.set("video-edit", videoId);

        uiSidePanel("show");
    },
    'click .js-remove-video': function (event) {
        event.preventDefault();

        confirmPopup({
            title: "Delete Video",
            msg: "Your are attempting to permanantly delete this video. Are you sure?",
            btn_type: "danger",
            btn_msg: "Delete(danger)"
        },
            function (canceled, confirmed) {
                if (canceled) {
                    console.log("device deletion canceled.");
                } else if (confirmed) {
                    let id = event.target.id;


                    /* Videos.remove(id); */

                    
                }
            });


    },
    'change #video-input': function (event) {
        let fileInput = $(event.target);

        if (!fileInput.val()) return

        var value = fileInput.val().replace(/^.*[\\\/]/, '')

        $("#video-input-label").text(value);


        let videoUploading = Session.get("video-uploading");
        videoUploading["name"] = value;

        let ev = event.target;

        if (ev.files && ev.files[0]) {
            videoUploading["status"] = true;
            Session.set("video-uploading", videoUploading);


            //do your own request an handle the results
            var file_data = ev.files[0]; // Getting the properties of file from file field
            var form_data = new FormData(); // Creating object of FormData class
            form_data.append("file", file_data) // Appending parameter named file with properties of file_field to form_data
            form_data.append("user_id", Meteor.userId()) // Adding extra parameters to form_data
            $.ajax({
                url: origins().files, // Upload Script
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data, // Setting the data attribute of ajax with file_data
                type: 'post',
                xhr: function () {
                    var xhr = $.ajaxSettings.xhr();
                    /* xhr.onprogress = function e() {
                        // For downloads
                        if (e.lengthComputable) {
                            console.log(e.loaded / e.total);
                        }
                    }; */
                    xhr.upload.onprogress = function (e) {
                        // For uploads
                        if (e.lengthComputable) {
                            //console.log(e.loaded / e.total);

                            videoUploading["status"] = true;
                            videoUploading["progress"] = (e.loaded / e.total) * 100;
                            Session.set("video-uploading", videoUploading);
                        }
                    };
                    return xhr;
                },
                success: function (data) {
                    // Do something after Ajax completes 
                    videoUploading["status"] = false;
                    videoUploading["name"] = "";
                    videoUploading["progress"] = 0;
                    Session.set("video-uploading", videoUploading);
                },
                error: function (err) {
                    videoUploading["status"] = false;
                    videoUploading["name"] = "";
                    videoUploading["progress"] = 0;
                    Session.set("video-uploading", videoUploading);
                }
            });
            /* let body = {
                "title": "Upload video",
                "msg": "Please confirm that you would like to upload and save this video.",
                "btn_type": "confirm",
                "btn_msg": "Upload now!"
            }


            var videoObj = new FS.File(ev.files[0]);
            videoObj['user_id'] = Meteor.userId();
            Videos.insert(videoObj, function (err, file) {
                // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                if (err) {
                    console.log(err);
                } else {

                    Deps.autorun(function (computation) {
                        var fileObj = Videos.findOne(file._id);

                        //console.log(fileObj.progress);
                        videoUploading["progress"] = fileObj.progress;
                        Session.set("video-uploading", videoUploading);

                        let available = fileObj.url();

                        if (available) {
                            videoUploading["status"] = false;
                            videoUploading["name"] = "";
                            videoUploading["progress"] = 0;
                            Session.set("video-uploading", videoUploading);

                            Videos.update(file._id, {
                                $set: {
                                    "download_complete": true
                                }
                            });



                            computation.stop();
                        }
                    });

                    document.getElementById("video-input").value = "";

                }
            }); */

        }

    }
});