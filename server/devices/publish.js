Meteor.publish('devicesSubscriptions', function(){
	return Devices.find({"user_id": this.userId});
});

Meteor.publish('getDevice', function(deviceId){
	return Devices.find({"device_id": deviceId});
});