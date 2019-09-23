Meteor.publish('company', function(){
	if(this.userId){

		let companyID = Meteor.users.findOne({_id: this.userId}).profile.company
		
		return Companies.find({
			'_id': companyID
		});
	}
	else{
		return [];
	}
});

Meteor.publish('publicCompany', function(endpoint){
	console.log(endpoint);
	return Companies.find({"endpoint": endpoint});
});