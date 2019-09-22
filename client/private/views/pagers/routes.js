Router.route('/pagers',{
	name: "pagers",
	controller: 'EmptyController',
	action: function(){

		this.render('pagers');

	},
});