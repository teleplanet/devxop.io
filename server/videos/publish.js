

Meteor.publish('videos', function(){
	return Videos.find({"user_id": this.userId});
});


Meteor.publish('videos.device', function(userId){
	return Videos.find({"user_id": userId});
});