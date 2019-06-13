String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1)
  }

Router.route('/display',{
	name: "displayBase",
	controller: 'DisplayController',
	action: function(){
		this.render();


		let query = this.params.query;

		let deviceId = query.deviceId;
		let accessToken = query.accessToken;


		console.log(query);
		let device = Devices.findOne({"device_id": deviceId, "auth.access_token": accessToken});
		if(!device){
			//Router.go("/display/error");
			console.log("no device found!");
			//window.location.reload(true);
		}else{
			let template = DisplayTemplates.findOne({"_id": device.selected_display});
			if(template){
				let finalPlates = [];

				for(let i = 0; i < template.display_items.length; i++){
					let plate = Items.findOne({ "_id": template.display_items[i]});

					if(plate){
						finalPlates.push(plate);
					}
				}
				//let items = Plates.find({ "_id": { "$in": template.display_items } }).fetch();

				Session.set("template", template);
				Session.set("device", device);
				Session.set("plates", finalPlates);

				//Router.go("/display/" + template.name + "?deviceId=" + device._id + "&accessToken=" + accessToken);
				this.render("display"+ template.name.capitalize());
			}else{
				window.location.reload(true);
			}
			
		}
		
		this.next();
		
	}
});