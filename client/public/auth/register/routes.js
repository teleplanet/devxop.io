Router.route('/register',{
	name: 'user.register',
	controller: 'EmptyController',
	action: function(){

		this.render();

		// this.render('register',{
		// 	to: 'mainContentArea',
		// 	// data: function(){
		// 	// 	return {
					
		// 	// 	}
		// 	// }
		// });

		// this.render('publicFooter', {
		// 	to: 'footerArea',
		// 	data: function(){
		// 		return {
		// 			'fixed': false,
		// 			'simple': false
		// 		}
		// 	}
		// });
	},
});