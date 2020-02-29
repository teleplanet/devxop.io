Router.route('/media', {
    name: "media",
    controller: 'PrivateController',
    action: function () {
        Session.set("route", "Media Library");
        this.render('media');
    },
});

Router.route('/media/images', {
    name: 'media.images',
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

  Router.route('/media/images/edit/:imageId', {
    name: 'media.images.edit',
	controller: 'PrivateController',
	action: function(){
        let image = Images.findOne({"_id": this.params.imageId});
		
		Session.set('image-edit', image);
		Session.set("route", "Media / Images / Edit");
		uiInfo(true);

        this.render('mediaImagesEdit');
    },
    onStop: function() {
        uiInfo(false);
    }
  });

  Router.route('/media/videos', {
      name: 'media.videos',
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