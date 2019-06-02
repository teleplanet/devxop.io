Router.route('/devices',{
	name: 'devices',
	controller: 'PrivateController',
	action: function(){

		this.render('devices');

	},
});