Router.route('/account/profile',{
	name: 'profile',
	controller: 'PrivateController',
	action: function(){

		Session.set("route", "Profile / " + Session.get("user").profile.name);
		this.render();

	},
});