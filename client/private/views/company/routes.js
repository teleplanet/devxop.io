Router.route('/company',{
	name: "company",
	controller: 'PrivateController',
	action: function(){

		Session.set("route", "Company / " + Session.get("company").name);
		this.render('company');

	},
});