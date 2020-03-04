
Router.route('/image/text', {
    controller: 'PrivateController',
    action: function () {
      if (this.ready()) {
/*         let template = Templates.findOne({ "_id": this.params.deviceId });
        Session.set("route", "Template / Edit");
  
        Session.set("template-edit", template);
   */
        Session.set("route", "Image / Text");
        this.render("imageText");
      }
      uiInfo(false);
    },
    onStop: function () {
      uiInfo(true);
    }
  });

  Router.route('/image/text/:imageText', {
    controller: 'PrivateController',
    action: function () {
      if (this.ready()) {
         let template = TemplatesImageText.findOne({ "_id": this.params.imageText });
        Session.set("route", "Image / Text / Edit");
  
        Session.set("imageText-edit", template);
   
        this.render("imageTextEdit");
      }
      uiInfo(false);
    },
    onStop: function () {
      uiInfo(true);
    }
  });

  

  

  Router.route('/image/text/:imageText/preview', {
	template: "emptyBase",
	waitOn: function () {
		return [
			Meteor.subscribe("templates.imageText"),
		];
	},
	action: function () {

		/* Session.set("selected-menu-index", query.index);
        Session.set("selected-menu", template.menus[query.index]); */
        let template = TemplatesImageText.findOne({ "_id": this.params.imageText });
  
        Session.set("imageText-edit", template);

		this.render("displayImageText");

		this.next();

	}
});