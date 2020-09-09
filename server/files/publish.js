Meteor.publish('files', function(){
	return Files.find({"user_id": this.userId});
});
