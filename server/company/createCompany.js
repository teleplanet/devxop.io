createCompany = function(name){
	let companyID = Companies.insert({
		name: name,
		createDate: new Date(),
		active: true,
	});

	return companyID;
	
}
