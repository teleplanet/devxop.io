Router.route('/items',{
	name: 'itens',
	controller: 'PrivateController',
	action: function(){

		this.render('items');

	},
});