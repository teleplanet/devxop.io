Template.login.events({
    'click .js-facebook-login': function(event) {
      Meteor.loginWithFacebook({}, function(err, data){
          if (err) {
            $('.js-error').html(err.reason);  
          }else{
            Router.go("/");
          }
      });
    },
    'focus .input-box':function(event, template){
      targetcheck(event.currentTarget);
    },
    'click .input-box':function(event, template){
      targetcheck(event.currentTarget);
    },
    'submit #login-form': function(event, template) {
      event.preventDefault();
      
      var email = template.find("#login-username").value;
      var pass = template.find("#login-password").value;
  
      if(email && pass){
        Meteor.loginWithPassword(email.toLowerCase(), pass, function(err) {
          if (err) {  
            $('.js-error').html(err.reason);  
            return;
          }
          else{
            // if we are on the login route, we want to redirect the user
            return Router.go('user.dashboard');
          }
        });
      }else{
        console.log("empty");
        return false;
      }
  
    }
  });