Meteor.publish('collections.private', function(){

	return Collections.find({"user_id": this.userId});
});