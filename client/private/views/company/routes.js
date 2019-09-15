Router.route('/company',{
	name: "company",
	controller: 'PrivateController',
	action: function(){

		this.render('company');

	},
});