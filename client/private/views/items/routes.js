Router.route('/items',{
	name: 'items',
	controller: 'PrivateController',
	action: function(){

		Session.set("route", "Items");
		this.render('items');

	},
});




Router.route('/item/create', {
	controller: 'PrivateController',
	action: function(){
		Session.set("route", "Item / Create");
		this.render('createItem');
	},
  });

  Router.route('/item/edit/:itemId', {
	controller: 'PrivateController',
	action: function(){
	  if(this.ready()){
		let item = Items.findOne({"_id": this.params.itemId});

		console.log("Session | item-edit: " + item._id);
		Session.set('item-edit', item);

		Session.set("route", "Item / Edit");

		this.render("editItem");
	  }else{
		this.render('loader');
	  }
	},
  });
  
  /* Router.route('/item/create/validate/:title', {
	controller: 'PrivateController',
	action: function(){
	  if(this.ready()){
		this.render('itemCreationValidation',{
		  data: function(){
			Session.set('item-creation-title', this.params.title);
		  }
		});
	  }else{
		this.render('loader');
	  }
	},
  });
  
  Router.route('/item/create/:title', {
	controller: 'PrivateController',
	action: function(){
	  if(this.ready()){
		this.render('createItem',{
		  data: function(){
			var data = {
			  title: this.params.title,
			  description: "",
			  tags: "",
			  categories: "",
			}
			Session.set('item-creation', data);
		  }
		});
	  }else{
		this.render('loader');
	  }
	},
  });
   */
  Router.route('/item/view/:itemid', {
	controller: 'PrivateController',
	//fastRender: true,
	action: function(){
	  if(this.ready()){
		this.render('viewItem',{
		  data: function(){
			Session.set('vieItem', items.findOne({_id: this.params.itemid}));
		  }
		});
		this.render('relatedItems', {to: 'related'});
	  }else{
		this.render('loader');
	  }
	},
  });