Router.route('/menu/:company',{
	name: "publicCompany",
	controller: 'EmptyController',
	waitOn: function () {

		return [
			Meteor.subscribe('images'),
			Meteor.subscribe('thumbnails'),
			Meteor.subscribe("publicCompany", Router.current().params.company)
		]
	},
	action: function(){

		Session.set("publicCompany", Companies.findOne());
		

		this.render('publicCompany');

	},
});

Router.route('/gsbistro',{
	name: "gsbistro",
	controller: 'EmptyController',
	waitOn: function () {

		return [
			/* Meteor.subscribe('images'),
			Meteor.subscribe('thumbnails') */
			Meteor.subscribe("pagers"),
			Meteor.subscribe("publicCompany", "gsbistro")
		]
	},
	action: function(){

		Session.set("publicCompany", Companies.findOne());
		

		this.render('publicCompany');

	},
});
