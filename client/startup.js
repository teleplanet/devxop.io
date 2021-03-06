
//import attachBanner from '@beyonk/gdpr-cookie-consent-banner';


import $ from "jquery";
import html2canvas from 'html2canvas';

import Highcharts from 'highcharts';
// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);

import Jimp from 'jimp';
import AColorPicker from 'a-color-picker';
import ImageCompressor from 'image-compressor.js';

stripe = undefined;


$(function () {
	// Handler for .ready() called.
	log("jquery is ready!");
});

Meteor.startup(function () {



	//Get viewport dimensions
	Session.set('vH', $(document).height());
	Session.set('vW', $(document).width());

	//initFB();

	if (Meteor.isClient) {

		let schedule = MultiscreenSchedule.findOne({ "user_id": this.userId });
		if (!schedule) {
			/* Here we create one */
			MultiscreenSchedule.insert({
				"devices": {},
				"stamp": 0,
				"active": false,
				"schedule": { "hour": 0, "minute": 0 }
			});
		}

		let imageText = TemplatesImageText.findOne({});
		if (!imageText) {
			/* Here we create one */
			TemplatesImageText.insert({
				"image": "",
				"name": name,
				"texts": [{
					"value": "Example Text",
					"style": { "color": "white;", "background": "red;" },
					"originals": {},
				}],

			});
		}



		TemplateStyles.insert({ "name": "Template Style" });
		Meteor.methods({
			"client.upsert": function (data) {
				/* console.log(this.isSimulation) //Will be true
				MyCollection.insert({test:true}); */

				if (data) {
					//Invoices.insert(data);

					Invoices.upsert({ "InvoiceNo": data.InvoiceNo }, {
						// Modifier
						$set: data
					});
				}
			}
		});

		let starting = true;
		Tracker.autorun(function () {
			if (Meteor.status().connected) {
				log("connected");
				starting = false;
			} else {
				if (starting) {
					log("connecting...");
				} else {
					//document.location.reload(true);
				}

				//
			}
		});
	}

});

stripeReadyHandler = function () {
	log("Stripe on Load handler");
	if (Meteor.isProduction) {
		console.log('Client Startup @' + moment().format('HH:mm:ss'));
		stripe = Stripe(Meteor.settings.public.stripe.live_pk);
	} else {
		console.log('[ENV: Development]\nClient Startup @' + moment().format('HH:mm:ss'));
		stripe = Stripe(Meteor.settings.public.stripe.test_pk);
	}
}

$(document).ready(function () {
	fingerprint();

	document["html2canvas"] = html2canvas;
	document["Jimp"] = Jimp;

	//document["imageEditor"] = ImageEditor;
	document["aColorPicker"] = AColorPicker;
	window["ImageCompressor"] = ImageCompressor;
	window["Jimp"] = Jimp;
	window["Highcharts"] = Highcharts;


	$(".js-modal-btn").click(function (event) {
		let id = $(event.target).data("modal-id");

		$("#" + id).toggleClass('toggled');

		$(document).mouseup(function (e) {
			var container = $("#" + id);

			if (!container.is(e.target) // if the target of the click isn't the container...
				&& container.has(e.target).length === 0) // ... nor a descendant of the container
			{
				container.removeClass("toggled");
			}
		});
	});
});

modal = function () {
	$(".js-modal-btn").click(function (event) {
		let id = $(event.target).data("modal-id");

		$("#" + id).toggleClass('toggled');

		$(document).mouseup(function (e) {
			var container = $("#" + id);

			if (!container.is(e.target) // if the target of the click isn't the container...
				&& container.has(e.target).length === 0) // ... nor a descendant of the container
			{
				container.removeClass("toggled");
			}
		});
	});
}


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

			let fb = {};

			FB.api('/me', function (response) {
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
			log("Facebook user does not authorize application!");
		} else {
			// The user isn't logged in to Facebook. You can launch a
			// login dialog with a user gesture, but the user may have
			// to log in to Facebook before authorizing your application.
			FB.login(function (response) {
				// Original FB.login code
				if (response.error) {
					log("No facebook user.");
					FB.login(function (response) {
						if (!response.error) {
							let fb = {};

							FB.api('/me', function (response) {
								log('Good to see you, ' + response.name + '.');
								fb["user"] = response;

								FB.api('/me/accounts', function (response) {
									fb["pages"] = response;

									Session.set("fb", fb);
								});
							});
						} else {
							log('User cancelled login or did not fully authorize.');
						}
					}, { perms: 'publish_pages,manage_pages,instagram_basic,user_photos,photo_upload,publish_stream' });
				} else {
					log("FACEBOOK USER CONNECTED!");
					let fb = {};

					FB.api('/me', function (response) {
						log('Good to see you, ' + response.name + '.');
						fb["user"] = response;

						FB.api('/me/accounts', function (response) {
							fb["pages"] = response;

							Session.set("fb", fb);
						});
					});
				}


			}/* , { auth_type: 'reauthenticate' } */)
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