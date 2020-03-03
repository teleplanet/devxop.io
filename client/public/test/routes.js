Router.route('/test', {
	template: "emptyBase",
	waitOn: function () {
		return [
			Meteor.subscribe("templates.imageText"),
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
			Meteor.subscribe("templates.imageText"),
		];
	},
	action: function () {

		/* Session.set("selected-menu-index", query.index);
        Session.set("selected-menu", template.menus[query.index]); */

		this.render("displayImageText");

		this.next();

	}
});