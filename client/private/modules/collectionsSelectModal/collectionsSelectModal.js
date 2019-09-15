collectionListModal = function (callback) {

    //get container instance
    var container = $(".collection-list-modal");
    //Session.set("module.collectionList", body)

    container.toggleClass("collection-list-modal-toggled");

    $(document).mouseup(function (e) {
        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            container.removeClass("collection-list-modal-toggled");
        }
    });

    $(".js-collection-list-cancel").on("click", function(){
        container.removeClass("collection-list-modal-toggled");
        return callback("Confirmation canceled.", null);
    });

    $(".js-collection-selected").on("click", function(event){
        container.removeClass("collection-list-modal-toggled");
        let colId = $(event.target).data('collection-id');

        let col = Collections.findOne({"_id": colId});

        console.log("Session | module.selectedcollection: " + col.name)

        Session.set("module.selectedCollection", col);
        return callback(null, col);
    });


}



Template.moduleCollectionSelectModal.onRendered(function () {
    Session.set("module.collectionList", {});
});

Template.moduleCollectionSelectModal.events({
    'click .js-popup-cancel': function () {

    }
});

Template.moduleCollectionSelectModal.helpers({
    'body': function () {
        return Session.get("module.confirmPopup");
    },
    'collections': function(){
        return Collections.find().fetch();
    }
});

