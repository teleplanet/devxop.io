Template.adminBase.onRendered(function(){
	
}) ;


Template.adminBase.helpers({
	'route': function(){
		let route = Session.get("route");	

		return route;
	},
	'showSidebar':function(){
		if(Session.get("sidebar") == true){
			return true;
		}else{
			return false;
		}
	},
	'searchFocus':function(){
		return Session.get("search-focus");
	}
});

Template.adminBase.events({
	'click .js-logout': function(event, template){
		event.preventDefault();
		Meteor.logout(function(){ 
			Router.go("/");
		});
	},
	'click #toggle-btn': function(){
		if ($(window).outerWidth() > 1194) {
			$('nav.side-navbar').toggleClass('shrink');
			$('.page').toggleClass('active');
		} else {
			$('nav.side-navbar').toggleClass('show-sm');
			$('.page').toggleClass('active-sm');
		}
	}
});