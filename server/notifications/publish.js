Meteor.publish('pushNotifications', function(){
	return PushNotifications.find({});
});