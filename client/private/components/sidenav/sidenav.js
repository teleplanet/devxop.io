Template.sidenav.events({
    'click .sidenav-btn': function(event){
        let target = event.currentTarget;

        $('.sidenav-btn').removeClass('active');
        $(target).addClass('active');
    }
});