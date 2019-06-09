Template.registerHelper("listCategories", function (num) {
	return Categories.find({}).fetch();
});

Template.registerHelper("getCategory", function (id) {
	return Categories.findOne({_id: id[0]});
});

Template.registerHelper("getCategoryColor", function (id) {
	return Categories.findOne({_id: id[0]}).color;
});