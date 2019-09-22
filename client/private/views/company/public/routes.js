Router.route('/menu/:company',{
	name: "publicCompany",
	controller: 'EmptyController',
	waitOn: function () {

		return [
			Meteor.subscribe('images'),
			Meteor.subscribe('thumbnails')
		]
	},
	action: function(){

		let company = Router.current().params.company;
		
		Meteor.call("company.doc", {"endpoint": company}, function(err, doc){


			if(err){
				console.log(err);
			}else{
				Session.set("publicCompany", doc);
			}
			
		});

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
			Meteor.subscribe("pagers")
		]
	},
	action: function(){

		let company = Router.current().params.company;
		
		/* Meteor.call("company.doc", {"endpoint": company}, function(err, doc){


			if(err){
				console.log(err);
			}else{
				Session.set("publicCompany", doc);
			}
			
		}); */

		this.render('publicCompany');

	},
});
