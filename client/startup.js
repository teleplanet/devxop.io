import ImageCompressor from 'image-compressor.js';

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

});

compress = function(){
	console.log("compressing images..");
	let items = Items.find({}).fetch();

	for(let i = 0; i < items.length; i++){
		let item = items[i];

		let data = {}

		let blob = dataURLtoBlob(item.image);

		new ImageCompressor(blob, {
			quality: .8,
			width: 720,
			height: 480,
			success(result) {
				blobToDataURL(result, function(dataurl){
					data['image_thumb'] = dataurl;

					new ImageCompressor(blob, {
						quality: .8,
						width: 1920,
						height: 1080,
						success(result) {
							blobToDataURL(result, function(dataurl){
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