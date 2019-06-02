Router.route('/',{
	name: 'home',
	controller: 'PublicController',
	action: function(){

		this.render();
		document.title = 'Pager.io';

		//If there's no logged in user, render public home, otherwise redirect to dashboard
		if(!Meteor.userId()){
			this.render('homepage',{ to: 'mainContentArea', });
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