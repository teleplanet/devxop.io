Meteor.publish('images', function(){
	return Images.find({"user_id": this.userId});
});

Meteor.publish('thumbnails', function(){
	return Thumbnails.find({"user_id": this.userId});
});


Meteor.publish('images.device', function(userId){
	return Images.find({"user_id": userId});
});
