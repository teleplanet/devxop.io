Meteor.publish('platesSubscriptions', function(){
	return Plates.find({});
});