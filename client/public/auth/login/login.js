/* Template.login.events({
    'submit #loginForm': function (e, t) {
        e.preventDefault();

        var email = t.find('#inputEmail').value.trim(),
            password = t.find('#inputPassword').value.trim();

        Meteor.loginWithPassword(email, password, function (err, data) {
            if (err) {
                console.log(err.reason);
            } else {
                Router.go("/");
            }
        });

        return false;

    },
}) */

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
      
      var email = template.find("#input-email").value;
      var pass = template.find("#input-password").value;
  
      if(email && pass){
        Meteor.loginWithPassword(email.toLowerCase(), pass, function(err) {
          if (err) {  
            $('.js-error').html(err.reason);  
            return;
          }
          else{
            // if we are on the login route, we want to redirect the user
            return Router.go('/');
          }
        });
      }else{
        console.log("empty");
        return false;
      }
  
    }
  });