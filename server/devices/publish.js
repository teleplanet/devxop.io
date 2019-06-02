Meteor.publish('devicesSubscriptions', function(){
	return Devices.find({});
});