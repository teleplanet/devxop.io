Router.route('/dashboard',{
	name: 'dashboard',
	controller: 'PrivateController',
	action: function(){

		//Renders the base layout
		this.render();
		document.title = 'Dashboard - Pager.io';

		//Render dashboards according to user role
		if(Meteor.user()){
			/* //If user is admin, render admin dashboard
			if(Roles.userIsInRole(Meteor.userId(), 'admin')){
				this.render('dashboard');
			}
			//else render staff dashboard
			else{
				//this.render('staffDashboard');
			} */
			
			this.render("headerBanner", {to: 'banner'})
            this.render('dashboard');
		}

	},
});