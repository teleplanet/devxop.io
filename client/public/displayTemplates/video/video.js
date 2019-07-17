
Template.displayVideo.helpers({
    'video': function () {

        /* if(!Session.get("module.videoUpload"))
            return;

        return Session.get("module.videoUpload"); */

        return Videos.findOne({ "_id": Session.get("template").video_id });
    }
});