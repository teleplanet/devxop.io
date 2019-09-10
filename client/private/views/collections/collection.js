
Template.collections.onRendered(function () {
    $('.collapsible').collapsible();
});

Template.collections.helpers({
    'collections': function () {
        return Collections.find().fetch();
    },
    'colItems': function (colItems) {
        //console.log(colItems);



        let res = Items.find({ "_id": { "$in": colItems } }).fetch();
        //console.log(res);


        return res;
    }
});

Template.collections.events({
    'click .js-add-item': function () {
        let collectionId = $(event.target).data('collection-id');
        let itemId = $(event.target).data('item-id');
        itemListModal(function (err, item) {
            if (err) {
                //console.log("user canceled item selection");
            } else {
                let collectionItems = Collections.findOne({ "_id": collectionId }).items;

                collectionItems.push(item._id)

                let data = {
                    "items": collectionItems
                };


                Meteor.call("collections.edit", collectionId, data, function (err, data) {
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
    'click .js-collection-item-remove': function (event) {
        let collectionId = $(event.target).data('collection-id');
        let itemId = $(event.target).data('item-id');


        let collectionItems = Collections.findOne({ "_id": collectionId }).items;

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

        Meteor.call("collections.edit", collectionId, data, function (err, data) {
            if (err)
                console.log(err);

            //console.log("item updated");
        });

    },
    'change .js-collection-edit': function (event) {
        let value = $(event.target).val();
        let key = $(event.target).data('key');
        let id = $(event.target).data('collection-id');;

        let data = {};
        data[key] = value;

        Meteor.call("collections.edit", id, data, function (err, data) {
            if (err) {
                console.log(err)
                notifyMessage("Failed item update", "danger");
            } else {
                notifyMessage("Collection successfully updated", "success");
            }
        });

    },
    'click .js-add-collection': function () {
        let data = {
            name: "New Collection " + new Date().getTime(),
            items: []
        }


        Meteor.call("collections.insert", data, function (err, res) {
            if (err) {
                notifyMessage("Failed creation of collection", "danger");
            } else {
                notifyMessage("Collection was created with success", "success");
            }
        });
    }
});