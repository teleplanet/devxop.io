Router.route('/menu',{
	name: 'menu',
	controller: 'PrivateController',
	action: function(){

		this.render('menu');

	},
});