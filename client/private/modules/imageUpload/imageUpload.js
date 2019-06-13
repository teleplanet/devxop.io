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
                quality: .6,
                success(result) {
                    //const formData = new FormData();

                    //formData.append('file', result, result.name);

                    //var blob = dataURLtoBlob('data:text/plain;base64,YWFhYWFhYQ==');
                    blobToDataURL(result, function(dataurl){
                        //console.log(dataurl);

                        Session.set("module.imageUpload", dataurl);
                        Session.set("module.processingLoader", false);

                        //console.log(dataURLtoBlob(dataurl));
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