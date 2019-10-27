Router.route('/login',{
	name: 'user.login',
	controller: 'EmptyController', //full page controller template
	action: function(){

		this.render("login");

	},
});