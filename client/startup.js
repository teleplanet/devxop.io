

Meteor.startup(function () {
	//Get viewport dimensions
	Session.set('vH', $(document).height());
	Session.set('vW', $(document).width());

	switch (process.env.NODE_ENV) {
		case 'development':
			console.log('[ENV: Development]\nClient Startup @' + moment().format('HH:mm:ss'));
			//Ignore mixpanel events on dev
			break;
		case 'production':
			console.log('Client Startup @' + moment().format('HH:mm:ss'));
	}



});
