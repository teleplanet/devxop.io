Router.route('/display/specials',{
	name: 'displaySpecials',
	controller: 'PublicController',
	action: function(){
		this.render();

		let query = this.params.query;

		let deviceId = query.deviceId;
		let accessToken = query.accessToken;

		let device = Devices.findOne({"device_id": deviceId, "auth.access_token": accessToken});
		if(!device){
			//Router.go("/display");
			Router.go("/display/" + template.name + "?deviceId=" + device._id + "&accessToken=" + accessToken);
		}else{

			let template = DisplayTemplates.findOne({"_id": device.selected_display});

			let items = Items.find({ "_id": { "$in": template.display_items } }).fetch();

			Session.set("template", template);
			Session.set("device", device);
			Session.set("plates", items);
		}

		this.next();
	}
});