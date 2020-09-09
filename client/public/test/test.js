Template.test.onRendered(function () {
    
});

Template.test.events({
    'click #toggle-nav-drawer':function(ev){
        let target = $("#app-content");
        if(target.hasClass("drawer-toggled")){
            target.removeClass("drawer-toggled");
        }else{
            target.addClass("drawer-toggled");
        }
    }
})