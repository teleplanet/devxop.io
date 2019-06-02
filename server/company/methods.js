Meteor.methods({
	'company.createCompany': function(name){
		check(name, String);

		let companyID = createCompany(name);

		return companyID;
	}
})