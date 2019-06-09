Router.route('/account/profile',{
	name: 'profile',
	controller: 'PrivateController',
	action: function(){

		this.render();

	},
});