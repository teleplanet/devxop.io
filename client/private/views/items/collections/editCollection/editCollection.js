Template.editCollection.events({
    'click .js-collection-item-remove': function (event) {
        let collection = Session.get("collection-edit");
        let itemId = $(event.target).data('item-id');


        let collectionItems = collection.items;

        let data = {
            "items": []
        };


        for (let i = 0; i < collectionItems.length; i++) {
            if (collectionItems[i] === itemId) {
                console.log(collectionItems[i] + " " + itemId);
            } else {
                data.items.push(collectionItems[i]);
            }
        }

        Meteor.call("collections.edit", collection._id, data, function (err, data) {
            if (err)
                console.log(err);

            //console.log("item updated");
        });

    },
    'click .js-add-item': function (event) {
        let collection = Session.get("collection-edit");
        itemListModal(function (err, item) {
            if (err) {
                //console.log("user canceled item selection");
            } else {
                let collectionItems = collection.items;

                collectionItems.push(item._id)

                let data = {
                    "items": collectionItems
                };


                Meteor.call("collections.edit", collection._id, data, function (err, data) {
                    if (err) {
                        console.log(err)
                        notifyMessage("Failed item update", "danger");
                    } else {
                        notifyMessage("Collection successfully updated", "success");
                    }
                });
            }
        });
    },
});

Template.editCollection.helpers({
    'collection':function(){
        return Collections.findOne({"_id": Session.get("collection-edit")._id});
    },
    'collectionItems': function(colItems){
        if(Array.isArray(colItems)){
            return Items.find({ "_id": { "$in": colItems } }).fetch();
        }else{
            return [];
        }
            

        
    }
});