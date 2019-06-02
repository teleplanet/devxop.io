Meteor.publish('categoriesSubscriptions', function(){
	return Categories.find({});
});