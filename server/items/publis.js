Meteor.publish('itemsSubscriptions', function(){
	return Items.find({}, {fields: {image:0}} );
});

Meteor.publish('itemsSubscriptionsImage', function(){
	return Items.find({});
});