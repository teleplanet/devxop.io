Meteor.publish('companyUsers', function(){
	if(this.userId){

		let companyID = Meteor.users.findOne({_id: this.userId}).profile.company
		
		return Meteor.users.find({
			'profile.company': companyID
		});
	}
	else{
		return [];
	}
});

Meteor.publish('users', function() {
	return Meteor.users.find({}); //this works OK, if i query the user collection before login this will be empty
});