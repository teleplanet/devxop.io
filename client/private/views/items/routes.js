Router.route('/items',{
	name: 'items',
	controller: 'PrivateController',
	action: function(){

		this.render('items');

	},
});




Router.route('/item/create', {
	controller: 'PrivateController',
	action: function(){
	  if(this.ready()){
		this.render('createItemCheck',{
		  data: function(){
			Session.set('tags', []);
		  }
		});
	  }else{
		this.render('loader');
	  }
	},
  });
  
  Router.route('/item/create/validate/:title', {
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