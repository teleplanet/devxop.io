Template.register.events({
	'submit #register-form' : function(e, t){
		e.preventDefault();
		
		var registerForm = $(e.currentTarget),
			submitBtn = registerForm.find('#registerButton');
		
		if (!submitBtn.is("[disabled]")) {

			var company = t.find('#input-company').value.trim(),
				fname = t.find('#input-fname').value.trim(), 
				lname = t.find('#input-lname').value.trim(), 
				email = t.find('#input-email').value.trim(), 
				password = t.find('#input-password').value.trim(),
				passwordConfirm = t.find('#input-confirm').value.trim(),
				isValid = true;


			//Validate form inputs
			//Company
			if(company.length === 0){
				t.$('.companyError').text('Provide the name of your company')
				isValid = false;
			}
			else{
				t.$('.companyError').text('')
			}

			//Email
			if(email.length === 0){
				t.$('.emailError').text('Provide an email')
				isValid = false;
			}
			else{
				if(!validateEmail(email)){
					isValid = false;
					t.$('.emailError').text('Provide a valid email')
				}
				else{
					t.$('.emailError').text('')
				}
			}

			//Passwords
			if(password.length > 0 && passwordConfirm.length > 0){
				if(password !== passwordConfirm){
					t.$('.passwordConfirmError').text('Passwords do not match')
					isValid = false;	
				}
				else{
					t.$('.passwordConfirmError').text('')
				}
			}
			else{
				t.$('.passwordConfirmError').text('Provide a password')
				isValid = false;
			}

		  	if(isValid){
		  		t.$('.errorMessage').text('');

		  		Meteor.call('auth.registerAccount', email, password, company, {f: fname, l: lname}, function(err, data){
		  			submitBtn.removeClass('m-progress').removeAttr("disabled");
		  			
		  			if(!err){
		  				Meteor.loginWithPassword(email, password, function(err){
		  					//Redirect home after login
		  					if(!err){
		  						Router.go('home');
		  					}
		  					else{		  						
		  						if (err.message = 'Incorrect password [403]') {
		  					  		toastr.error('Please check that your email/password are correct.');
		  						}
		  						else{
		  							toastr.error('Error loggin in.');
		  						}
		  					}
		  				});
		  			}
		  			else{
		  				toastr.error('Error registering account.')
		  			}
		  		});
		  	}
		  	else{
		  		submitBtn.removeClass('m-progress').removeAttr("disabled");
		  	}
		}

		return false; 
	
	},
})