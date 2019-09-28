Router.route('/devices',{
	name: 'devices',
	controller: 'PrivateController',
	action: function(){
		Session.set("route", "Devices");
		this.render('devices');

	},
});


Router.route('/devices/edit/:deviceId', {
	controller: 'PrivateController',
	action: function(){
	  if(this.ready()){
		let device = Devices.findOne({"_id": this.params.deviceId});

		console.log("Session | device-edit: " + device._id);
		Session.set('device-edit', device);
		Session.set("route", "Device / Edit");

		this.render("deviceEdit");
	  }else{
		this.render('loader');
	  }
	},
  });