Router.route('/collections',{
	name: "collections",
	controller: 'PrivateController',
	action: function(){

		Session.set("route", "Collections");
		this.render('collections');

	},
});

Router.route('/collections/:collectionId',{
	name: "collectionsEdit",
	controller: 'PrivateController',
	action: function(){
		let col = Collections.findOne({"_id": this.params.collectionId});

		console.log("Session | collection-edit: " + col._id);
		Session.set('collection-edit', col);
		Session.set("route", "Collection / Edit");

		this.render('editCollection');

	},
});