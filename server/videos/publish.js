

Meteor.publish('videos', function(){
	return Videos.find({});
});


Meteor.publish('videos.device', function(userId){
	return Videos.find({"user_id": userId});
});