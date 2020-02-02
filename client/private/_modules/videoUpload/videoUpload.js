
Template.moduleVideoUpload.onRendered(function () {
    Session.set("module.videoUpload", null);
});


Template.moduleVideoUpload.helpers({
    'video': function () {

        /* if(!Session.get("module.videoUpload"))
            return;

        return Session.get("module.videoUpload"); */

        return Videos.findOne({ "_id": Session.get("module.videoUpload") });
    }
});

Template.moduleVideoUpload.events({
    'change #videoUploadButton': function (event) {
        let ev = event.target;

        if (ev.files && ev.files[0]) {

            let body = {
                "title": "Upload video",
                "msg": "Please confirm that you would like to upload and save this video.",
                "btn_type": "confirm",
                "btn_msg": "Upload now!"
            }

            confirmPopup(body, function (err, data) {
                if (err) {
                    console.log(err);
                } else {

                    //start processing Loader
                    Session.set("module.processingLoader", true);

                    var videoObj = new FS.File(ev.files[0]);
                    videoObj['user_id'] = Meteor.userId();
                    Videos.insert(videoObj, function (err, file) {
                        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                        if (err) {
                            console.log(err);
                        } else {

                            Deps.autorun(function (computation) {
                                var fileObj = Videos.findOne(file._id);

                                console.log(fileObj.progress);

                                let available = fileObj.url();

                                if (available) {
                                    Session.set("module.videoUpload", file._id);

                                    //stop loader
                                    Session.set("module.processingLoader", false);

                                    $('.js-video-upload-event').click();

                                    computation.stop();
                                }
                            });


                        }
                    });
                }
            });


            /* var reader = new FileReader();

            reader.onload = function (e) {
                console.log("Session | module.imageUpload: " + e.target.result.length);

                Session.set("module.videoUpload", e.target.result);

                $("#uploadedVideo").attr({
                    "src": e.target.result,
                    "autoplay": "autoplay",        
                })

                let data = {
                    "video": e.target.result
                };
        
                Meteor.call("videos.insert", data, function(err, data){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("video has been saved");
                    }
                });

                
            };

            reader.readAsDataURL(ev.files[0]); */

        }
    },
    'click .js-video-save': function () {


    }

});