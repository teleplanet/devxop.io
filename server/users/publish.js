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