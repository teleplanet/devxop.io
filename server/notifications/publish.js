Meteor.publish('pushNotifications', function(){
	return PushNotifications.find({});
});

Meteor.publish('publicPushNotifications', function(query){
	return PushNotifications.find(query);
});