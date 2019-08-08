String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1)
}

Router.route('/display', {
	name: "displayBase",
	layoutTemplate: 'displayBase',
	waitOn: function () {
		let query = this.params.query;
		let deviceId = query.deviceId;

		return [
			Meteor.subscribe('devicesSubscriptionsPublic', deviceId),
		]
	},
	action: function () {

		this.render("mainLoader");

		let query = this.params.query;

		let deviceId = query.deviceId;
		let accessToken = query.accessToken;

		let device = Devices.findOne({ "device_id": deviceId, "auth.access_token": accessToken });
		if (!device) {
			window.location.reload(true);
		} else {
			Deps.autorun(function () {
				// subscribe to the posts publication
				var subscription = Meteor.subscribe('displayTemplatesSubscriptionsPublic', device._id);

				// if subscription is ready, set limit to newLimit
				if (subscription.ready()) {
					let template = DisplayTemplates.findOne({ "_id": device.selected_display });

					if (template) {
						Deps.autorun(function () {
							var subscription2 = Meteor.subscribe('itemsSubscriptionsPublic', template.display_items);
							var subscriptionVideo = Meteor.subscribe('videos');
							if (subscription2.ready() && subscriptionVideo) {
								let finalPlates = Items.find().fetch();
								let video = Videos.findOne({"_id": template.video_id});

								Session.set("template", template);
								Session.set("device", device);
								Session.set("plates", finalPlates);
								Session.set("video", video);

								Router.current().render("display" + template.name.capitalize());
							}
						});
					} else {
						console.log("no template!");
						window.location.reload(true);
					}

				} else {
					//console.log("> Subscription is not ready yet. \n\n");
				}
			});

		}

		this.next();

	}
});