import ImageCompressor from 'image-compressor.js';

Template.moduleImageUpload.onRendered(function () {
    Session.set("module.imageUpload", null);
});


Template.moduleImageUpload.helpers({
    'imageUrl': function () {

        if(!Session.get("module.imageUpload"))
            return;

        return Session.get("module.imageUpload")["url"];
    }
});

Template.moduleImageUpload.events({
    'change #imageUploadButton': function (event) {
        let ev = event.target;
        if (ev.files && ev.files[0]) {

            new ImageCompressor(ev.files[0], {
                quality: .8,
                success(result) {
                    //const formData = new FormData();

                    //formData.append('file', result, result.name);

                    let imageUrl = URL.createObjectURL(result);

                    

                    Session.set("module.imageUpload", {url: imageUrl, blob: result});


                    console.log(result);
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