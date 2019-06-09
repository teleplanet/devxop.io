Router.route('/register',{
	name: 'register',
	controller: 'EmptyController',
	action: function(){

		this.render();
		document.title = 'Create Account - Scheduler';

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