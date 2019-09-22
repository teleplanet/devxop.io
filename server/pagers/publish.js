Meteor.publish('pagers', function(){
	return Pagers.find({});
});