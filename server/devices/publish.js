Meteor.publish('devicesSubscriptions', function(){
	return Devices.find({"user_id": this.userId});
});

Meteor.publish('getDevice', function(deviceId){
	return Devices.find({"device_id": deviceId}, {fields: {ping_stamp:0}});
});


Meteor.publish('multiscreenSchedule', function(){
	return MultiscreenSchedule.find({"user_id": this.userId});
});

Meteor.publish('devices.schedules', function(){
	return DeviceSchedules.find({"user_id": this.userId});
});