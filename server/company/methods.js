Meteor.methods({
	'company.create': function(name){
		check(name, String);

		let companyID = createCompany(name);

		return companyID;
	}
})