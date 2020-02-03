Template.mediaVideos.onRendered(function () {
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

        data.videos = Videos.find({ "download_complete": true }).fetch(),
            data.total = data.videos.length,

            data.videos.forEach(function (video) {
                data.storage += video.original.size;
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
    'click .js-remove-video': function (event) {
        event.preventDefault();

        let id = event.target.id;


        Videos.remove(id);
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
            let body = {
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
            });
            
        }

    }
});