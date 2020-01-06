
Template.collections.onRendered(function () {
    //$('.collapsible').collapsible();
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
    'click .js-select-collection': function(event){
        console.log(event);
        let itemId = $(event.target).data('col-id');

        Router.go("/collections/" + itemId);
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