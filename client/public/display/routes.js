String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1)
}

Router.route('/display', {
	name: "displayBase",
	layoutTemplate: 'displayBase',
	waitOn: function () {
		let deviceId = fingerprint();

		let query = this.params.query;

		if (query["override"]) {
			return [
				Meteor.subscribe('getDevice', query["override"])
			]
		} else {
			return [
				Meteor.subscribe('getDevice', deviceId)
			]
		}


	},
	action: function () {
		var self = this;
		Deps.autorun(function () {

			let device = Devices.findOne();
			Session.set("device", device);

			if (device) {
				let items = Meteor.subscribe("items.device", device.display_types.slider.items);
				let images = Meteor.subscribe("images.device", device.user_id);
				let videos = Meteor.subscribe("videos.device", device.user_id);

				if (items.ready() && images.ready() && videos.ready()) {
					self.render("display");
				} else {
					//Router.current().next();
				}
			} else {
				self.render("display");
			}



		});

		return self.next();

	}
});