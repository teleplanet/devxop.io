import ImageCompressor from 'image-compressor.js';

Template.moduleImageUpload.onRendered(function () {
    Session.set("module.imageUpload", null);
});


Template.moduleImageUpload.helpers({
    'imageUrl': function () {

        if (!Session.get("module.imageUpload"))
            return;

        return Session.get("module.imageUpload");
    }
});

Template.moduleImageUpload.events({
    'change #imageUploadButton': function (event) {
        let ev = event.target;

        Session.set("module.processingLoader", true);

        if (ev.files && ev.files[0]) {

            var reader = new FileReader();

            reader.onload = function (e) {
                var data = e.target.result;

                //SCALE IMAGE TO EXACT DIMENSIONS OF 480p
                scaleImage(data, 720, 480, function (canvas) {
                    // save canvas image as data url (png format by default)
                    //var blob = dataURItoBlob(canvas.toDataURL());

                    var blob  = dataURItoBlob(canvas.toDataURL("image/jpeg"));

                    new ImageCompressor(blob, {
                        quality: .6,
                        width: 720,
                        height: 480,
                        success(result) {
                            
                            blobToDataURL(result, function (dataurl) {
                                
                                Session.set("module.imageUploadThumb", dataurl);

                                //SCALE IMAGE TO EXACT DIMENSIONS OF 1080p
                                scaleImage(data, 1920, 1080, function (canvas) {
                                    // save canvas image as data url (png format by default)
                                    var blob = dataURItoBlob(canvas.toDataURL("image/jpeg"));

                                    new ImageCompressor(blob, {
                                        quality: .6,
                                        width: 1920,
                                        height: 1080,
                                        success(result) {
                                            blobToDataURL(result, function (dataurl) {
                                                Session.set("module.imageUpload", dataurl);

                                                //stop loader
                                                Session.set("module.processingLoader", false);

                                                $('.js-image-upload-event').click();
                                            });

                                        },
                                        error(e) {
                                            console.log(e.message);
                                        },
                                    });

                                });
                            });

                        },
                        error(e) {
                            console.log(e.message);
                        },
                    });



                });


            };

            reader.readAsDataURL(ev.files[0]);

        }
    },
});
