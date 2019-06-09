Template.headerDropdown.events({
	'click .js-logout': function(event, template){
		Meteor.logout();
		/*Meteor.call("logoutUser",function(err, data){
			if(err){
				console.log(err);
			}else{
				
			}
		});*/
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