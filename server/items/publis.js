Meteor.publish('itemsSubscriptions', function(){
	return Items.find({});
});