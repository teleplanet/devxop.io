


Template.moduleItemSelect.onRendered(function(){
    //Session.set("module.selecteditem", null);
});

Template.moduleItemSelect.events({
    'click .js-item-selected':function(event){
        let itemId = $(event.target).data('item-id');

        let item = Items.findOne({"_id": itemId});

        console.log("Session | module.selecteditem: " + item.name)

        Session.set("module.selecteditem", item);

        $(".item-select-modal").removeClass("item-select-modal-toggled");

    },
    'click #itemButton':function(event){
        event.preventDefault();
        $('.item-select-modal').toggleClass('item-select-modal-toggled');

    },
});


Template.moduleItemSelect.helpers({
    'selected': function(){
        //$("#itemButton").css({"background-color": getRandomColor()});

        return Session.get("module.selecteditem");
    },
    'itemList':function(){
        return Items.find().fetch();
    }
});


$(document).mouseup(function(e)
{
    var container = $(".header-dropdown");
     var container2 = $(".item-select-modal");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.removeClass("header-dropdown-toggled");
    }

    if(!container2.is(e.target) // if the target of the click isn't the container...
        && container2.has(e.target).length === 0)
    {
    	container2.removeClass("item-select-modal-toggled");
    }
});

/* Template.moduleitemSelect.events({
    'change #itemSelect':function(event){
        let val = $(event.target).val();

        console.log(val);

        Session.set("module.selecteditem", val);

    }
});


Template.moduleitemSelect.helpers({
    'itemSelected': function(){
        return Session.get("module.selecteditem");
    },
    'itemList':function(){

        let list = [
            "specials",
            "crepes",
            "light"
        ]

        return list;
    }
}); */