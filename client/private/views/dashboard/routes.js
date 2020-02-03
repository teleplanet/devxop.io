Router.route('/dashboard',{
	name: 'user.dashboard',
	controller: 'PrivateController',
	action: function(){

		//Renders the base layout
		this.render();

		//Render dashboards according to user role
		if(Meteor.user()){
			/* Session.set("route", "Dashboard");
			this.render('dashboard'); */
			Router.go("/devices");
		}

	},
});