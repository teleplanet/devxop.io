


Template.moduleCategorySelect.onRendered(function(){
    Session.set("module.selectedCategory", null);
});

Template.moduleCategorySelect.events({
    'click .js-category-selected':function(event){
        let catId = $(event.target).data('category-id');

        let category = Categories.findOne({"_id": catId});

        console.log("Session | module.selectedCategory: " + category.name)

        Session.set("module.selectedCategory", category);

        $(".category-select-modal").removeClass("category-select-modal-toggled");

    },
    'click #categoryButton':function(event){
        event.preventDefault();
        $('.category-select-modal').toggleClass('category-select-modal-toggled');

    }
});


Template.moduleCategorySelect.helpers({
    'selected': function(){
        $("#categoryButton").css({"background-color": getRandomColor()});

        return Session.get("module.selectedCategory");
    },
    'categoryList':function(){
        return Categories.find().fetch();
    }
});


$(document).mouseup(function(e)
{
    var container = $(".header-dropdown");
     var container2 = $(".category-select-modal");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.removeClass("header-dropdown-toggled");
    }

    if(!container2.is(e.target) // if the target of the click isn't the container...
        && container2.has(e.target).length === 0)
    {
    	container2.removeClass("category-select-modal-toggled");
    }
});