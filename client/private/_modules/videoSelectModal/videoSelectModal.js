videoListModal = function (callback) {

    /* RESET EVENT LISTENERS IMPORTNAT */
    $(".js-video-list-cancel").unbind('click');
    $(".js-video-selected").unbind('click');

    
    //get container instance
    var container = $(".video-list-modal");
    //Session.set("module.videoList", body)

    container.toggleClass("video-list-modal-toggled");

    $(document).mouseup(function (e) {
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.removeClass("video-list-modal-toggled");
        }
    });

    $(".js-video-list-cancel").on("click", function(){
        event.preventDefault();
        container.removeClass("video-list-modal-toggled");


        return callback("Confirmation canceled.", null);
    });

    $(".js-video-selected").on("click", function(event){
        event.preventDefault();
        container.removeClass("video-list-modal-toggled");
        let videoId = $(event.target).data('video-id');

        let video = Videos.findOne({"_id": videoId});

        /* console.log("Session | module.selectedvideo: " + video.name)

        Session.set("module.selectedvideo", video); */
        return callback(null, video);
    });


}



Template.moduleVideoListPopup.onRendered(function () {
    Session.set("module.videoList", {});
});

Template.moduleVideoListPopup.events({
    'click .js-popup-cancel': function () {

    }
});

Template.moduleVideoListPopup.helpers({
    'body': function () {
        return Session.get("module.confirmPopup");
    },
    'videos': function(){
        return Videos.find().fetch();
    }
});

