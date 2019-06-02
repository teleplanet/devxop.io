Template.navbar.helpers({
    'companyName': function () {
        var company = Session.get("company");

        if(company){
            return company.name;
        }else{
            return "";
        }
        
    },
    'username':function(){
        return Session.get("user").profile.firstName;
    }
});
