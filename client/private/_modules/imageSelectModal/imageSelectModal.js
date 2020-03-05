imageListModal = function (callback) {

    /* RESET EVENT LISTENERS IMPORTNAT */
    $(".js-image-list-cancel").unbind('click');
    $(".js-image-selected").unbind('click');


    //get container instance
    var container = $(".image-list-modal");
    //Session.set("module.imageList", body)

    container.toggleClass("image-list-modal-toggled");

    $(document).mouseup(function (e) {
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.removeClass("image-list-modal-toggled");
        }
    });

    $(".js-image-list-cancel").on("click", function () {
        event.preventDefault();
        container.removeClass("image-list-modal-toggled");


        return callback("Confirmation canceled.", null);
    });

    $(".js-image-selected").on("click", function (event) {
        event.preventDefault();
        container.removeClass("image-list-modal-toggled");
        let imageId = $(event.target).data('image-id');

        let image = Images.findOne({ "_id": imageId });

        /* console.log("Session | module.selectedimage: " + image.name)

        Session.set("module.selectedimage", image); */
        return callback(null, image);
    });


}



Template.moduleImageListPopup.onRendered(function () {
    Session.set("module.imageList", {});
});

Template.moduleImageListPopup.events({
    'click .js-popup-cancel': function () {

    }
});

Template.moduleImageListPopup.helpers({
    'body': function () {
        return Session.get("module.confirmPopup");
    },
    'images': function () {
        return Images.find({ "template_id": { $exists: false }, "imageText_id": { $exists: false }  }).fetch();
    }
});

