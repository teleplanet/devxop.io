Meteor.publish('images', function(){
	return Images.find({});
});

Meteor.publish('thumbnails', function(){
	return Thumbnails.find({});
});


Meteor.publish('images.device', function(userId){
	return Images.find({"user_id": userId});
});
