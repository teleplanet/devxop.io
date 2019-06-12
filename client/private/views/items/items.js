var timer;
var delay = 2000; // 0.6 seconds delay after last input


Template.items.onRendered(function () {
    let items = Items.find().fetch();
    Session.set("items", items);
});

Template.items.helpers({
    'listItems': function () {
        return Session.get("items");
    },
    'listCategories': function () {
        return [];
    },
    'categoriesList':function(){
        return Categories.find().fetch();
    },
    'getCategory':function(catId, key){
        let cat = Categories.findOne({"category": parseInt(catId)});
        
        if(cat){
            return cat[key];
        }else{
            return "";
        }
    }
});

Template.items.events({
    'click .js-items-card-select': function(event) {
        let itemId = $(event.currentTarget).data('item-id');

        Router.go("/item/edit/" + itemId);
    }
});