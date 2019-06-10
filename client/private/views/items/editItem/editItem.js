Template.editItem.onRendered(function(){

    let item = Session.get("item-edit");
    let category = Categories.findOne({"_id": item.category});

    Session.set("module.selectedCategory", category);
});

Template.editItem.helpers({
    'item': function(){
        return Session.get("item-edit");
    }
});