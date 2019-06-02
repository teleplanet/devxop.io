Router.route('/banner',{
	name: 'banner',
	controller: 'PrivateController',
	action: function(){

		this.render('banner');

	},
});