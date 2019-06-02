Router.route('/display/error',{
	name: 'displayError',
	controller: 'DisplayController',
	action: function(){
		this.render();
	}
});