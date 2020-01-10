Template.suppliers.onRendered(function () {
    var controller = Iron.controller();
    controller.render('suppliersInfo', { to: 'nav-panel-info' });


});

Template.suppliers.helpers({
    'suppliers': function(){
        return Suppliers.find().fetch();
    }
});

Template.suppliers.events({
    'click .js-remove-supplier': function (event, template) {
        event.preventDefault();

        let id = event.target.id;


        Suppliers.remove(id);
    },
});