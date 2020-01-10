


Template.moduleSupplierSelect.onRendered(function(){
    //Session.set("module.selectedDisplay", null);
});

Template.moduleSupplierSelect.events({
    'click .js-supplier-selected':function(event){
        let supplier = $(event.target).data('name');

        //let display = DisplayTemplates.findOne({"_id": displayId});

        console.log("Session | module.selectedSupplier: " + supplier)

        Session.set("module.selectedSupplier", supplier);

        $(".select-modal").removeClass("select-modal-toggled");

    },
    'click #displayButton':function(event){
        event.preventDefault();
        $('.select-modal').toggleClass('select-modal-toggled');

    },
});


Template.moduleSupplierSelect.helpers({
    'selected': function(){
        //$("#displayButton").css({"background-color": getRandomColor()});

        return Session.get("module.selectedSupplier");
    },
    'suppliers':function(){
    

        return Suppliers.find().fetch();
    }
});


$(document).mouseup(function(e)
{
    var container = $(".header-dropdown");
     var container2 = $(".select-modal");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.removeClass("header-dropdown-toggled");
    }

    if(!container2.is(e.target) // if the target of the click isn't the container...
        && container2.has(e.target).length === 0)
    {
    	container2.removeClass("select-modal-toggled");
    }
});

/* Template.moduleDisplaySelect.events({
    'change #displaySelect':function(event){
        let val = $(event.target).val();

        console.log(val);

        Session.set("module.selectedDisplay", val);

    }
});


Template.moduleDisplaySelect.helpers({
    'displaySelected': function(){
        return Session.get("module.selectedDisplay");
    },
    'displayList':function(){

        let list = [
            "specials",
            "crepes",
            "light"
        ]

        return list;
    }
}); */