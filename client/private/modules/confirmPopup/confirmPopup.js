confirmPopup = function (body, callback) {
    if (!body) {
        return console.log("Required keys: title, msg, btn_type, btn_msg");
    }

    //get container instance
    var container = $(".confirm-popup-modal");
    Session.set("module.confirmPopup", body)

    container.toggleClass("confirm-popup-modal-toggled");

    $(document).mouseup(function (e) {
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.removeClass("confirm-popup-modal-toggled");
        }
    });


    $(".js-popup-confirm").on("click", function(){
        container.removeClass("confirm-popup-modal-toggled");
        return callback(null, "Confirmation confirmed.");
    });

    $(".js-popup-cancel").on("click", function(){
        container.removeClass("confirm-popup-modal-toggled");
        return callback("Confirmation canceled.", null);
    });


}



Template.moduleConfirmPopup.onRendered(function () {
    Session.set("module.confirmPopup", {});
});

Template.moduleConfirmPopup.events({
    'click .js-popup-cancel': function () {

    }
});

Template.moduleConfirmPopup.helpers({
    'body': function () {
        return Session.get("module.confirmPopup");
    }
});

