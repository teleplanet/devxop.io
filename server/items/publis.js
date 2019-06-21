Meteor.publish('itemsSubscriptions', function(){
	return Items.find({"user_id": this.userId}, {fields: {image:0}} );
});

Meteor.publish('itemsSubscriptionsPublic', function(items){


	return Items.find({"_id": { "$in" : items} });
});