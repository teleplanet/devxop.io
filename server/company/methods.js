Meteor.methods({
	'company.create': function(name){
		check(name, String);

		let companyID = createCompany(name);

		return companyID;
	},
	'company.edit': function (id, data) {
        //console.log(data);
        
        data["user_id"] = this.userId;

        Companies.update(id, {
            $set: data,
        });
    },
    'company.doc': function(query){
        return Companies.findOne(query);
    },
})