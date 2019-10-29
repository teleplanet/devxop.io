Template.registerHelper("plan", function () {
	return Session.get("plan");
});

Template.registerHelper("planActive", function () {

	return Session.get("plan.active");

});