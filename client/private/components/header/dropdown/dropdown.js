Template.headerDropdown.events({
	'click .js-logout': function(event, template){
		event.preventDefault();
		Meteor.logout(function(){ 
			Router.go("/");
		});
	},
	'click .js-profile':function(event, template){
		Router.go("/account/profile");
	},
	'click .js-posts':function(event, template){
		Router.go("/user/posts");
	},
	'click .js-messaging':function(event, template){
		Router.go("/user/chat");
	},
});