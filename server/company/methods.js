Meteor.methods({
	'company.create': function(name){
		check(name, String);

		let companyID = createCompany(name);

		return companyID;
    },
    'company.user.add': function(){
        let companyId = Meteor.users.findOne({_id: this.userId}).profile.company;        

        if(companyId){

            let set1 = companyId.slice(companyId.length - 4);
            let set2 = generateId(4);
            let unique = set1 + "-" + set2;

            CompanyUsers.insert({
                "company": companyId,
                "unique_id": unique,
                "created_by": this.userId,
                "created_stamp": new Date().getTime()
            });

            return true;
        }else{
            return false;
        }
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
});

