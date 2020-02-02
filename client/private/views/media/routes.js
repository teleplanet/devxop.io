Router.route('/media/images', {
	controller: 'PrivateController',
	action: function(){
		Session.set("route", "Media / Images");
		uiInfo(true);

        this.render('mediaImages');
    },
    onStop: function() {
        uiInfo(false);
    }
  });

  Router.route('/media/videos', {
	controller: 'PrivateController',
	action: function(){
		Session.set("route", "Media / Videos");
		uiInfo(true);

        this.render('mediaVideos');
    },
    onStop: function() {
        uiInfo(false);
    }
  });