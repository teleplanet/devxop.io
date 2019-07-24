import ImageCompressor from 'image-compressor.js';

import Materialize from 'materialize-css';
global.M = global.Materialize = Materialize;

Meteor.startup(function () {
	//Get viewport dimensions
	Session.set('vH', $(document).height());
	Session.set('vW', $(document).width());

	switch (process.env.NODE_ENV) {
		case 'development':
			console.log('[ENV: Development]\nClient Startup @' + moment().format('HH:mm:ss'));
			//Ignore mixpanel events on dev
			break;
		case 'production':
			console.log('Client Startup @' + moment().format('HH:mm:ss'));
	}


	Session.set("fb", undefined);

});


initFB = function () {

	FB.getLoginStatus(function (response) {
		if (response.status === 'connected') {
			// The user is logged in and has authenticated your
			// app, and response.authResponse supplies
			// the user's ID, a valid access token, a signed
			// request, and the time the access token 
			// and signed request each expire.
			var uid = response.authResponse.userID;
			var accessToken = response.authResponse.accessToken;

			//Meteor.call("user.")

			//console.log(response);

			console.log("FACEBOOK USER CONNECTED!");
			console.log('Welcome!  Fetching your information.... ');
			let fb = {};

			FB.api('/me', function (response) {
				console.log(response);
				console.log('Good to see you, ' + response.name + '.');
				fb["user"] = response;

				FB.api('/me/accounts', function (response) {
					fb["pages"] = response;

					Session.set("fb", fb);
				});
			});
		} else if (response.status === 'not_authorized') {
			// The user hasn't authorized your application.  They
			// must click the Login button, or you must call FB.login
			// in response to a user gesture, to launch a login dialog.
			console.log("Facebook user does not authorize application!");
		} else {
			// The user isn't logged in to Facebook. You can launch a
			// login dialog with a user gesture, but the user may have
			// to log in to Facebook before authorizing your application.
			FB.login(function (response) {
				// Original FB.login code
				if (response.error) {
					console.log("No facebook user.");
					FB.login(function (response) {
						if (!response.error) {
							console.log('Welcome!  Fetching your information.... ');
							let fb = {};

							FB.api('/me', function (response) {
								console.log(response);
								console.log('Good to see you, ' + response.name + '.');
								fb["user"] = response;

								FB.api('/me/accounts', function (response) {
									fb["pages"] = response;

									Session.set("fb", fb);
								});
							});
						} else {
							console.log('User cancelled login or did not fully authorize.');
						}
					}, { perms: 'publish_pages,manage_pages,instagram_basic,user_photos,photo_upload,publish_stream' });
				} else {
					console.log("FACEBOOK USER CONNECTED!");
					console.log('Welcome!  Fetching your information.... ');
					let fb = {};

					FB.api('/me', function (response) {
						console.log(response);
						console.log('Good to see you, ' + response.name + '.');
						fb["user"] = response;

						FB.api('/me/accounts', function (response) {
							fb["pages"] = response;

							Session.set("fb", fb);
						});
					});
				}


			}, { auth_type: 'reauthenticate' })
		}
	});
}




compress = function () {
	console.log("compressing images..");
	let items = Items.find({}).fetch();

	for (let i = 0; i < items.length; i++) {
		let item = items[i];

		let data = {}

		let blob = dataURLtoBlob(item.image);

		new ImageCompressor(blob, {
			quality: .8,
			width: 720,
			height: 480,
			success(result) {
				blobToDataURL(result, function (dataurl) {
					data['image_thumb'] = dataurl;

					new ImageCompressor(blob, {
						quality: .8,
						width: 1920,
						height: 1080,
						success(result) {
							blobToDataURL(result, function (dataurl) {
								data['image'] = dataurl;

								Meteor.call("items.edit", item['_id'], data, function (err, data) {
									if (err)
										console.log(err);

									console.log("item updated");
								});
							});

						},
						error(e) {
							console.log(e.message);
						},
					});
				});
			},
			error(e) {
				console.log(e.message);
			},
		});
	}
}