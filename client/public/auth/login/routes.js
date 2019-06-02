Router.route('/login',{
	name: 'login',
	controller: 'EmptyController', //full page controller template
	action: function(){

		this.render();
		document.title = 'Login - Scheduler';

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