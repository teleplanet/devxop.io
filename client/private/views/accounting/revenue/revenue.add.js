/* $(document).mouseup(function(e)
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
}); */

Template.revenueAdd.onRendered(function(){
    modal();
});