Meteor.publish('displayTemplatesSubscriptions', function(){
	return DisplayTemplates.find({"user_id": this.userId});
});

Meteor.publish('displayTemplatesSubscriptionsPublic', function(deviceId){
	return DisplayTemplates.find({"device_id": deviceId});
});