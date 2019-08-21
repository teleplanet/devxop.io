Router.route('/test', {
	template: "emptyBase",
	action: function () {

		this.render("test");

		this.next();

	}
});