


Template.moduleDisplaySelect.onRendered(function(){
    //Session.set("module.selectedDisplay", null);
});

Template.moduleDisplaySelect.events({
    'click .js-display-selected':function(event){
        let display = $(event.target).data('display');

        //let display = DisplayTemplates.findOne({"_id": displayId});

        console.log("Session | module.selectedDisplay: " + display)

        Session.set("module.selectedDisplay", display);

        $(".display-select-modal").removeClass("display-select-modal-toggled");

    },
    'click #displayButton':function(event){
        event.preventDefault();
        $('.display-select-modal').toggleClass('display-select-modal-toggled');

    },
});


Template.moduleDisplaySelect.helpers({
    'selected': function(){
        //$("#displayButton").css({"background-color": getRandomColor()});

        return Session.get("module.selectedDisplay");
    },
    'displayList':function(){
    

        return displayTypes;//DisplayTemplates.find().fetch();
    }
});


$(document).mouseup(function(e)
{
    var container = $(".header-dropdown");
     var container2 = $(".display-select-modal");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.removeClass("header-dropdown-toggled");
    }

    if(!container2.is(e.target) // if the target of the click isn't the container...
        && container2.has(e.target).length === 0)
    {
    	container2.removeClass("display-select-modal-toggled");
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