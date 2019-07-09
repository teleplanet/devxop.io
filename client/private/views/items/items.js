var timer;
var delay = 2000; // 0.6 seconds delay after last input


Template.items.onRendered(function () {

    let items = Items.find().fetch();
    Session.set("items", items);
});

Template.items.helpers({
    'listItems': function () {

        let selectedCat = Session.get("module.selectedCategory");

        if(selectedCat){
            let items = Items.find({category: selectedCat._id}).fetch();
            Session.set("items", items);
        }else{
            let items = Items.find().fetch();
            Session.set("items", items);
        }

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
    },
    'click .js-clear-category': function(event) {
        Session.set("module.selectedCategory", null);
    }
});