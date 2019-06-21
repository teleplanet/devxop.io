Meteor.methods({
	'auth.registerAccount': function(email, password, companyName, nameObject){
		check(email, String);
		check(password, String);
		check(companyName, String);

		//Create user
		var userId = Accounts.createUser({
			email: email, 
			password : password,
		});

		//Create company
		let companyId = createCompany(companyName);

		//Assign company to user profile
		Meteor.users.update({
			_id: userId,
		},
		{
			$set:{
				'profile.company': companyId,
				'profile.first_name': nameObject.f,
				'profile.last_name': nameObject.l,
				'profile.name': nameObject.f + " " + nameObject.l
			}
		});

		//Return userId
		return userId;

	}
});