Router.route('/',{
	name: 'landing',
	controller: 'PublicController',
	action: function(){

		this.render();
		document.title = 'devxop.io';

		//If there's no logged in user, render public home, otherwise redirect to dashboard
		if(!Meteor.userId()){
			this.render('landing',{ to: 'mainContentArea', });
		}
		else{
			Router.go('dashboard');
		}


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