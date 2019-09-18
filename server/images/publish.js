Meteor.publish('images', function(){
	return Images.find({});
});

Meteor.publish('thumbnails', function(){
	return Thumbnails.find({});
});