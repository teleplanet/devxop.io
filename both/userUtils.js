getUserName = function(userId){
	var user = Meteor.users.findOne({_id: userId });

	if(typeof user.profile.firstName !== 'undefined' && typeof user.profile.lastName !== 'undefined'){
		if(user.profile.firstName.length > 0 && user.profile.lastName.length > 0){
			return user.profile.firstName + ' ' + user.profile.lastName;
		}
		else{
			return user.emails[0].address
		}
	}
	else{
		return user.emails[0].address
	}
}