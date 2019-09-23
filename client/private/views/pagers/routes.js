Router.route('/pagers',{
	name: "pagers",
	controller: 'PrivateController',
	action: function(){

		this.render('pagers');

	},
});