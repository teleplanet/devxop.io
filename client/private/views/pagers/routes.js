Router.route('/pagers',{
	name: "pagers",
	controller: 'PrivateController',
	action: function(){	

		Session.set("route", "Virtual Pagers");
		this.render('pagers');

	},
});