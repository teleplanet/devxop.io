Router.route('/logout',{
	name: 'logout',
	controller: 'PrivateController',
	action: function(){

		//Renders the base layout
        this.render();
        
		//Render dashboards according to user role
		Meteor.logout();

        Router.go("/");

	},
});