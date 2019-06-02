Meteor.methods({
	'auth.registerAccount': function(email, password, companyName){
		check(email, String);
		check(password, String);
		check(companyName, String);

		//Create user
		var userId = Accounts.createUser({
			email: email, 
			password : password,
		});

		//Set user as an admin
		Roles.addUsersToRoles(userId, 'admin');

		//Create company
		let companyID = createCompany(companyName);

		//Assign company to user profile
		Meteor.users.update({
			_id: userId,
		},
		{
			$set:{
				'profile.company': companyID
			}
		});

		//Return userId
		return userId;

	}
});