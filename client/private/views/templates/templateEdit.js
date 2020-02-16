
Template.templateEdit.onRendered(function(){
        var controller = Iron.controller();
        controller.render('templateEditInfo', { to: 'nav-panel-info' });
});

Template.templateEdit.helpers({
    'template': function(){
        return Session.get("template-edit");
    },
    
});

Template.templateEdit.events({
    'click .js-category-select': function(event){
        let categoryIndex = $(event.currentTarget).data("category-index");

        let data = {
            'category_index': categoryIndex,
            'category_edit': true,
            'item_index': null,
            'item_edit': false
        }

        Session.set("template-edit-index", data);
    },
    'click .js-item-select': function(event){
        let categoryIndex = $(event.currentTarget).data("category-index");
        let itemIndex = $(event.currentTarget).data("item-index");

        let data = {
            'category_index': categoryIndex,
            'category_edit': false,
            'item_index': itemIndex,
            'item_edit': true,
        }

        Session.set("template-edit-index", data);
    }

});