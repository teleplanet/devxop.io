Router.route('/receipts',{
	name: 'receipts',
	controller: 'PrivateController',
	action: function(){

		this.render('receipts');

	},
});