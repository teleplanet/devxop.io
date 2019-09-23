//Global routes configuration
Router.configure({ 
	//trackPageView: true,
	loadingTemplate: 'mainLoader',
	//notFoundTemplate: 'templateNotFound'
});

//Controller for public routes
PublicController = RouteController.extend({
  	layoutTemplate: 'publicBase',
  	yieldRegions: {
		'publicMenu': {
			to: 'menuArea'
		},
	},
	waitOn: function(){
		return [
			/* Meteor.subscribe('itemsSubscriptions'),
			Meteor.subscribe('categoriesSubscriptions'),
			Meteor.subscribe('devicesSubscriptions'),
			Meteor.subscribe('displayTemplatesSubscriptions') */
		];
	}
});

EmptyController = RouteController.extend({
	layoutTemplate: 'emptyBase',
	waitOn: function(){
		return [
			Meteor.subscribe('pagers'),
		];
	}
});

DisplayController = RouteController.extend({
	layoutTemplate: 'displayBase',
	waitOn: function(){
		return [
			Meteor.subscribe('images'),
			Meteor.subscribe('thumbnails')
		];
	}
});

//Controller for private routes
PrivateController = RouteController.extend({
  	layoutTemplate: 'privateBase',
  	yieldRegions: {
		'userMenu': {
			to: 'menuArea'
		}
	},
	waitOn: function(){
		return [
			Meteor.subscribe('companyUsers'),
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
		];
	},
	action: function(){

		document.title = "devxop.com";

		if (this.ready()){ 
			console.log("ACTION!");
			//set session
			Session.set("company", Companies.findOne({"_id": Meteor.user().profile.company}));
			//set session
			Session.set("user", Meteor.user());

			initFB();
			
		} else { this.render('Loading'); }
	}
});

//Check for user login before action (for all routes)
Router.onBeforeAction(function()
	{
		//Check if a user is logged in. If not, redirect home
		if(!Meteor.user()) {
			if(Meteor.loggingIn()){
				this.render(this.loadingTemplate);
			}
			else{
				//Router.go('login');
				this.next();
			}
		}
		else{
			//set session
			Session.set("company", Companies.findOne({"_id": Meteor.user().profile.company}));
			//set session
			Session.set("user", Meteor.user());

			//set route
			Session.set("route", {title: Router.current().route.getName()});

			this.next(); 
		}
	}, 
	{
		//Add route names we don't want this onBeforeAction to apply
		except: [
			'home',
			'login',
			'register',
			'slider',
			'display'
		]
	}
);