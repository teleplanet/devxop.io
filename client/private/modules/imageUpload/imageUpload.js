import ImageCompressor from 'image-compressor.js';

Template.moduleImageUpload.onRendered(function () {
    Session.set("module.imageUpload", null);
});


Template.moduleImageUpload.helpers({
    'imageUrl': function () {

        if(!Session.get("module.imageUpload"))
            return;

        return Session.get("module.imageUpload");
    }
});

Template.moduleImageUpload.events({
    'change #imageUploadButton': function (event) {
        let ev = event.target;

        Session.set("module.processingLoader", true);

        if (ev.files && ev.files[0]) {
            new ImageCompressor(ev.files[0], {
                quality: .8,
                width: 720,
                height: 480,
                success(result) {
                    blobToDataURL(result, function(dataurl){
                        Session.set("module.imageUploadThumb", dataurl);
                    });

                },
                error(e) {
                    console.log(e.message);
                },
            });


            new ImageCompressor(ev.files[0], {
                quality: .8,
                width: 1920,
                height: 1080,
                success(result) {
                    blobToDataURL(result, function(dataurl){
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

            /* var reader = new FileReader();

            reader.onload = function (e) {
                console.log("Session | module.imageUpload: " + reader.result.length);

                //Session.set("module.imageUpload", e.target.result);
            };

            let dataURL = reader.readAsDataURL(ev.files[0]); */

        }
    },
});