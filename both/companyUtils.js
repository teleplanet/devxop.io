getCompanyName = function(userId){
	var user = Meteor.users.findOne({_id: userId });

	if(typeof user.profile.company !== 'undefined'){

        var company = Companies.findOne({_id: user.profile.company});
        
        if(typeof company.name !== 'undefined'){
            return company.name;
        }else{
            return "unknown";
        }
	}
	else{
		return "unknown"
	}
}