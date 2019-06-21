Meteor.publish('devicesSubscriptions', function(){
	return Devices.find({"auth.user_id": this.userId});
});

Meteor.publish('devicesSubscriptionsPublic', function(deviceId){
	return Devices.find({"device_id": deviceId});
});