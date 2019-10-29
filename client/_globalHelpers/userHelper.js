
Template.registerHelper('user', function (key) {
   let user = Session.get("user");

   if(user){
      return user.profile;
   }else{
      return {};
   }

   
});
