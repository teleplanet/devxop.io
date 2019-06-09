Template.header.helpers({
	countNotifications:function(){
		return Session.get("notifications").length;
	},
	hasNotification: function(){
		if(Session.get("notifications").length <= 0){
			return false;
		}else{
			return true;
		}
	},
	user:function(){
		return Session.get("user");
	},
});

Template.header.events({
	'click .js-menu':function(event, template){
		$('#showcase').addClass('stars-hidden');

		$('.layout-test').toggleClass('layout-test-toggled');
		$('.layout-menu-overlay').toggleClass('layout-menu-overlay-toggled');
		$('.list-vertical').toggleClass('list-vertical-toggled');

	},
	'click .js-profile':function(event, template){
		$(".header-dropdown").toggleClass("header-dropdown-toggled");
	},
	'click .js-search':function(event, template){
		$('.layout-test').toggleClass('layout-test-searching');
		$('.search').toggleClass('css-toggled');
	},
	'click .js-notification':function(event, template){
		$('.navbar-notification-modal').toggleClass('navbar-notification-modal-toggled');
	},
});

Template.headerBanner.events({
	'click .js-search':function(event, template){
		$('.layout-test').toggleClass('layout-test-searching');
		$('.search').toggleClass('css-toggled');
	},
});

$(document).mouseup(function(e)
{
    var container = $(".header-dropdown");
     var container2 = $(".navbar-notification-modal");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.removeClass("header-dropdown-toggled");
    }

    if(!container2.is(e.target) // if the target of the click isn't the container...
        && container2.has(e.target).length === 0)
    {
    	container2.removeClass("navbar-notification-modal-toggled");
    }
});
