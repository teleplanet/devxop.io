

RouterAutoscroll.animationDuration = 100;

RouterAutoscroll.marginTop = 50;


//Global routes configuration
Router.configure({
	//trackPageView: true,
	loadingTemplate: 'mainLoader',
	//notFoundTemplate: 'templateNotFound'
});



//Controller for public routes
PublicController = RouteController.extend({
	layoutTemplate: 'publicBase',
	waitOn: function () {
		return [
			Meteor.subscribe("user.plan.subscriptions"),
			Meteor.subscribe("user.plan.archive"),
			/* Meteor.subscribe('itemsSubscriptions'),
			Meteor.subscribe('categoriesSubscriptions'),
			Meteor.subscribe('devicesSubscriptions'),
			Meteor.subscribe('displayTemplatesSubscriptions') */
		];
	}
});

EmptyController = RouteController.extend({
	layoutTemplate: 'emptyBase',
	waitOn: function () {
		return [
			Meteor.subscribe('templates.imageText'),
		];
	}
});

DisplayController = RouteController.extend({
	layoutTemplate: 'displayBase',
	/* waitOn: function(){
		return [
			Meteor.subscribe('images'),
			Meteor.subscribe('thumbnails')
		];
	} */
});

//Controller for private routes
AdminController = RouteController.extend({
	layoutTemplate: 'adminBase',
	waitOn: function () {
		return [
			Meteor.subscribe('admin.users'),
			Meteor.subscribe('admin.items'),
			Meteor.subscribe('admin.collections'),
			Meteor.subscribe('admin.devices'),
			Meteor.subscribe('admin.companies'),
			Meteor.subscribe('admin.messages')
		];
	},
	onBeforeAction: function () {
		//Check if a user is logged in. If not, redirect home
		if (this.ready()) {
			if (Meteor.user()) {
				if (!Meteor.loggingIn()) {
					//this.render(this.loadingTemplate);
					if (Meteor.user().roles[0] == "admin") {
						this.next();
					} else {
						Router.go('/');
					}
				}
				else {
					//Router.go('/');
				}
			} else {
				Router.go('/');
			}
		}

	}
});

//Controller for private routes
PrivateController = RouteController.extend({
	layoutTemplate: 'privateBase',
	waitOn: function () {
		return [
			/* Meteor.subscribe("user.plan"), */
			Meteor.subscribe("user.plan.subscriptions"),

			Meteor.subscribe('company.users'),
			Meteor.subscribe('company'),
			
			Meteor.subscribe('itemsSubscriptions'),
			Meteor.subscribe('categoriesSubscriptions'),
			Meteor.subscribe('devicesSubscriptions'),
			Meteor.subscribe('displayTemplatesSubscriptions'),
			Meteor.subscribe('videos'),
			Meteor.subscribe('collections.private'),
			Meteor.subscribe('images'),
			Meteor.subscribe('thumbnails'),
			Meteor.subscribe('pagers'),

			Meteor.subscribe('revenues'),
			Meteor.subscribe('expenses'),
			Meteor.subscribe('suppliers'),
			Meteor.subscribe('costs'),

			Meteor.subscribe('templates'),
			Meteor.subscribe('templates.imageText'),
			Meteor.subscribe('templates.styles'),

			Meteor.subscribe('multiscreenSchedule'),
			Meteor.subscribe('devices.schedules'),

			Meteor.subscribe('files'),
			/* Meteor.subscribe('invoices') */
		];
	},
	onBeforeAction: function () {

		if (this.ready() /* && Session.get("plan.status") */) {
			//set session
			Session.set("company", Companies.findOne({ "_id": Meteor.user().profile.company }));
			//set session
			Session.set("user", Meteor.user());
			//Set session plan
			Session.set("plan", Meteor.user().plan);

			this.next();
		} else {
			Router.go("plan");
		}

	}
});

Router.onStop(function(){
	uiSidePanel("hide");

	$('html,body').scrollTop(0);
	$('.ui-content').scrollTop(0);
})

//Check for user login before action (for all routes)
Router.onBeforeAction(function () {
	// Only required on client
	if (Meteor.isClient) {
		$(".page").animate({ scrollTop: 0 }, "fast");
	}

	//Check if a user is logged in. If not, redirect home
	if (Meteor.user()) {
		Meteor.call("plans.active", function (err, res) {
			if (err) {

			} else {
				if (!res) {
					Session.set("plan.status", false);
					//Router.go("/");
				} else {
					//Router.go("/dashboard")
					Session.set("plan.status", true);
				}
			}
		});

	}


	this.next();
}
);
