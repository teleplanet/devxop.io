templateListModal = function (callback) {

    /* RESET EVENT LISTENERS IMPORTNAT */
    $(".js-template-list-cancel").unbind('click');
    $(".js-template-selected").unbind('click');

    
    //get container instance
    var container = $(".template-list-modal");
    //Session.set("module.templateList", body)

    container.toggleClass("template-list-modal-toggled");

    $(document).mouseup(function (e) {
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.removeClass("template-list-modal-toggled");
        }
    });

    $(".js-template-list-cancel").on("click", function(){
        event.preventDefault();
        container.removeClass("template-list-modal-toggled");


        return callback("Confirmation canceled.", null);
    });

    $(".js-template-selected").on("click", function(event){
        event.preventDefault();
        container.removeClass("template-list-modal-toggled");
        let templateId = $(event.target).data('template-id');

        let template = Templates.findOne({"_id": templateId});

        /* console.log("Session | module.selectedtemplate: " + template.name)

        Session.set("module.selectedtemplate", template); */
        return callback(null, template);
    });


}



Template.moduleTemplateListPopup.onRendered(function () {
    Session.set("module.templateList", {});
});

Template.moduleTemplateListPopup.events({
    'click .js-popup-cancel': function () {

    }
});

Template.moduleTemplateListPopup.helpers({
    'body': function () {
        return Session.get("module.confirmPopup");
    },
    'templates': function(){
        return Templates.find().fetch();
    }
});

