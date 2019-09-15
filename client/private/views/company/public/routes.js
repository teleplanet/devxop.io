Router.route('/menu/:company',{
	name: "publicCompany",
	controller: 'EmptyController',
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