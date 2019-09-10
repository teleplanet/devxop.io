Router.route('/collections',{
	name: "collections",
	controller: 'PrivateController',
	action: function(){

		this.render('collections');

	},
});