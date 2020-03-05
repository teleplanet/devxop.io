imageTextListModal = function (callback) {

    /* RESET EVENT LISTENERS IMPORTNAT */
    $(".js-imageText-list-cancel").unbind('click');
    $(".js-imageText-selected").unbind('click');

    
    //get container instance
    var container = $(".imageText-list-modal");
    //Session.set("module.templateList", body)

    container.toggleClass("imageText-list-modal-toggled");

    $(document).mouseup(function (e) {
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.removeClass("imageText-list-modal-toggled");
        }
    });

    $(".js-imageText-list-cancel").on("click", function(){
        event.preventDefault();
        container.removeClass("imageText-list-modal-toggled");


        return callback("Confirmation canceled.", null);
    });

    $(".js-imageText-selected").on("click", function(event){
        event.preventDefault();
        container.removeClass("imageText-list-modal-toggled");
        let templateId = $(event.target).data('image-text');

        let imageText = TemplatesImageText.findOne({"_id": templateId});

        /* console.log("Session | module.selectedtemplate: " + imageText.name)

        Session.set("module.selectedtemplate", imageText); */
        return callback(null, imageText);
    });


}



Template.moduleImageTextListPopup.onRendered(function () {
    Session.set("module.imageTextList", {});
});

Template.moduleImageTextListPopup.events({
    'click .js-popup-cancel': function () {

    }
});

Template.moduleImageTextListPopup.helpers({
    'body': function () {
        return Session.get("module.confirmPopup");
    },
    'imageTexts': function(){
        return TemplatesImageText.find().fetch();
    }
});

