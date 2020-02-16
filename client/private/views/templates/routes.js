Router.route('/templates', {
    name: 'templates',
  controller: 'PrivateController',
  action: function(){
      Session.set("route", "Templates");
      uiInfo(true);

      this.render('templates');
  },
  onStop: function() {
      uiInfo(false);
  }
});

Router.route('/templates/:deviceId', {
	controller: 'PrivateController',
	action: function(){
	  if(this.ready()){
		let template = Templates.findOne({"_id": this.params.deviceId});
        Session.set("route", "Template / Edit");
        
        Session.set("template-edit", template);

		this.render("templateEdit");
	  }
	  uiInfo(false);
	},
    onStop: function() {
        uiInfo(true);
    }
  });