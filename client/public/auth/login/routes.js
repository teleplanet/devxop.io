Router.route('/login',{
	name: 'public.login',
	controller: 'EmptyController', //full page controller template
	action: function(){

		this.render("login");

	},
});