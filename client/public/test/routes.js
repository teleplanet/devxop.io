Router.route('/test', {
	template: "emptyBase",
	waitOn: function () {
		return [
			Meteor.subscribe("templates"),
		];
	},
	action: function () {

		this.render("test");

		this.next();

	}
});

Router.route('/test/screen', {
	template: "emptyBase",
	waitOn: function () {
		return [
			Meteor.subscribe("templates"),
		];
	},
	action: function () {

		let query = this.params.query;
		let template = Templates.findOne()

		Session.set("selected-menu-index", query.index);
        Session.set("selected-menu", template.menus[query.index]);

		this.render("screen");

		this.next();

	}
});