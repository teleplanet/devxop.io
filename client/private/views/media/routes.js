Router.route('/media/images', {
	controller: 'PrivateController',
	action: function(){
		Session.set("route", "Media / Images");
		this.render('mediaImages');
	},
  });