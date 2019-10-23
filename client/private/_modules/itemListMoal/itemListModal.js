itemListModal = function (callback) {

    //get container instance
    var container = $(".item-list-modal");
    //Session.set("module.itemList", body)

    container.toggleClass("item-list-modal-toggled");

    $(document).mouseup(function (e) {
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.removeClass("item-list-modal-toggled");
        }
    });

    $(".js-item-list-cancel").on("click", function(){
        container.removeClass("item-list-modal-toggled");
        return callback("Confirmation canceled.", null);
    });

    $(".js-item-selected").on("click", function(event){
        container.removeClass("item-list-modal-toggled");
        let itemId = $(event.target).data('item-id');

        let item = Items.findOne({"_id": itemId});

        console.log("Session | module.selecteditem: " + item.name)

        Session.set("module.selecteditem", item);
        return callback(null, item);
    });


}



Template.moduleItemListPopup.onRendered(function () {
    Session.set("module.itemList", {});
});

Template.moduleItemListPopup.events({
    'click .js-popup-cancel': function () {

    }
});

Template.moduleItemListPopup.helpers({
    'body': function () {
        return Session.get("module.confirmPopup");
    },
    'items': function(){
        return Items.find().fetch();
    }
});

