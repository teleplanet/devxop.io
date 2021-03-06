/* import Tesseract from 'tesseract.js';

Template.mediaImages.events({
    'change #imageUploadButton': async ({ target: { files } }) => {
        const { data: { text } } = await Tesseract.recognize(files[0], 'eng', {
            logger: m => console.log(m),
        });
        console.log(text);
    },
}); */

import ImageCompressor from 'image-compressor.js';


Template.mediaImages.onRendered(function () {
    var controller = Iron.controller();
    controller.render('imagesEdit', { to: 'ui-side-panel' });

    Session.set("image-uploading", { status: false, progress: 0, name: "" });
});

Template.mediaImages.helpers({
    'data': function () {
        //console.log("data was called..");
        let data = {
            images: [],
            total: 0,
            storage: 0,
        };

        data.images = Files.find({ "is_image": true, "template_id": { $exists: false } }, { sort: { "uploadedAt": -1 } }).fetch();
        data.total = data.images.length;

        for (let i = 0; i < data.images.length; i++) {
            const image = data.images[i];
            data.storage += image.file.size;
        }

        return data;
    },
    'imageUploading': function () {

        return Session.get("image-uploading");
    },
})

Template.mediaImages.events({
    'change #image-input-test': function (e) {
        //prevent Default functionality
        e.preventDefault();

        var value = $(e.target).val().replace(/^.*[\\\/]/, '')

        let ev = e.target;
        if (ev.files && ev.files[0]) {
            let imageUploading = Session.get("image-uploading");
            imageUploading["name"] = value;
            Session.set("image-uploading", imageUploading);

            //do your own request an handle the results
            var file_data = ev.files[0]; // Getting the properties of file from file field
            var form_data = new FormData(); // Creating object of FormData class
            form_data.append("file", file_data) // Appending parameter named file with properties of file_field to form_data
            form_data.append("user_id", Meteor.userId()) // Adding extra parameters to form_data
            $.ajax({
                url: origins().files, // Upload Script
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data, // Setting the data attribute of ajax with file_data
                type: 'post',
                xhr: function () {
                    var xhr = $.ajaxSettings.xhr();
                    /* xhr.onprogress = function e() {
                        // For downloads
                        if (e.lengthComputable) {
                            console.log(e.loaded / e.total);
                        }
                    }; */
                    xhr.upload.onprogress = function (e) {
                        // For uploads
                        if (e.lengthComputable) {
                            //console.log(e.loaded / e.total);

                            imageUploading["status"] = true;
                            imageUploading["progress"] = (e.loaded / e.total) * 100;
                            Session.set("image-uploading", imageUploading);
                        }
                    };
                    return xhr;
                },
                success: function (data) {
                    // Do something after Ajax completes 
                    imageUploading["status"] = false;
                    imageUploading["name"] = "";
                    imageUploading["progress"] = 0;
                    Session.set("image-uploading", imageUploading);
                },
                error: function (err) {
                    imageUploading["status"] = false;
                    imageUploading["name"] = "";
                    imageUploading["progress"] = 0;
                    Session.set("image-uploading", imageUploading);
                }
            });
        }

    },
    'click .js-select-image': function (event) {
        event.preventDefault();
        let imageId = $(event.currentTarget).data("image");

        Session.set("image-edit", imageId);

        uiSidePanel("show");
    },
    'click .js-remove-image': function (event) {
        event.preventDefault();

        confirmPopup({ title: "Delete image", msg: "Your are attempting to permanantly delete this image. Are you sure?", btn_type: "danger", btn_msg: "Delete(danger)" }, function (canceled, confirmed) {
            if (canceled) {
                console.log("device deletion canceled.");
            } else if (confirmed) {
                let id = event.target.id;


                Images.remove(id);
            }
        })
    },

    'change #image-input': function (event) {
        let fileInput = $(event.target);

        if (!fileInput.val()) return

        var value = fileInput.val().replace(/^.*[\\\/]/, '')

        $("#image-input-label").text(value);


        let imageUploading = Session.get("image-uploading");
        imageUploading["name"] = value;

        let ev = event.target;


        if (ev.files && ev.files[0]) {
            imageUploading["status"] = true;
            Session.set("image-uploading", imageUploading);
            var reader = new FileReader();

            reader.onload = function (e) {
                var data = e.target.result;
                imageUploading["status"] = true;
                imageUploading["progress"] = 25;
                Session.set("image-uploading", imageUploading);


                //SCALE IMAGE TO EXACT DIMENSIONS OF 1080p
                scaleImage(data, 1920, 1080, function (canvas) {
                    // save canvas image as data url (png format by default)
                    var blob = dataURItoBlob(canvas.toDataURL("image/jpeg"));

                    new ImageCompressor(blob, {
                        quality: 1,
                        width: 1920,
                        height: 1080,
                        success(result) {
                            var imageObj = new FS.File(result);
                            imageObj['user_id'] = Meteor.userId();
                            Images.insert(imageObj, function (err, image) {
                                // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                                if (err) {
                                    console.log(err);
                                } else {

                                    Deps.autorun(function (computation) {
                                        var fileObj = Images.findOne(image._id);

                                        //console.log(fileObj.progress);
                                        imageUploading["progress"] = fileObj.progress;
                                        Session.set("image-uploading", imageUploading);

                                        let available = fileObj.url();

                                        if (available) {
                                            imageUploading["status"] = false;
                                            imageUploading["name"] = "";
                                            imageUploading["progress"] = 0;
                                            Session.set("image-uploading", imageUploading);

                                            Images.update(fileObj._id, {
                                                $set: {
                                                    "download_complete": true
                                                }
                                            });

                                            document.Jimp.read({
                                                url: available, // Required!

                                            }).then(image => {
                                                // Do stuff with the image.
                                                image.rotate(180, false);

                                                //console.log(image);

                                                image.getBase64Async("image/jpeg").then(data => {
                                                    var image = new Image();
                                                    image.src = data;

                                                    var w = window.open("");
                                                    w.document.write(image.outerHTML);
                                                });
                                            }).catch(err => {
                                                // Handle an exception.
                                            });

                                            scaleImage(data, 480, 360, function (canvas) {
                                                // save canvas image as data url (png format by default)
                                                //var blob = dataURItoBlob(canvas.toDataURL());

                                                var blob = dataURItoBlob(canvas.toDataURL("image/jpeg"));

                                                new ImageCompressor(blob, {
                                                    quality: 1,
                                                    width: 480,
                                                    height: 360,
                                                    success(result) {
                                                        imageUploading["progress"] = 50;
                                                        Session.set("image-uploading", imageUploading);

                                                        var thumbObj = new FS.File(result);
                                                        thumbObj['user_id'] = Meteor.userId();
                                                        Thumbnails.insert(thumbObj, function (err, thumbnail) {
                                                            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                                                            if (err) {
                                                                console.log(err);
                                                            } else {

                                                                Images.update(imageObj._id, {
                                                                    $set: {
                                                                        "image_thumb": thumbnail._id,
                                                                        "download_complete": true,
                                                                    }
                                                                })
                                                            }
                                                        });

                                                    },
                                                    error(e) {
                                                        console.log(e.message);
                                                    },
                                                });
                                            });

                                            computation.stop();
                                        }
                                    });





                                }
                            });

                        },
                        error(e) {
                            console.log(e.message);
                        },
                    });

                });





                /* //SCALE IMAGE TO EXACT DIMENSIONS OF 480p
                scaleImage(data, 720, 480, function (canvas) {
                    // save canvas image as data url (png format by default)
                    //var blob = dataURItoBlob(canvas.toDataURL());
                    
                    var blob = dataURItoBlob(canvas.toDataURL("image/jpeg"));

                    new ImageCompressor(blob, {
                        quality: 1,
                        width: 720,
                        height: 480,
                        success(result) {
                            imageUploading["progress"] = 50;
                            Session.set("image-uploading", imageUploading);
                            blobToDataURL(result, function (dataurl) {



                                //SCALE IMAGE TO EXACT DIMENSIONS OF 1080p
                                scaleImage(data, 1920, 1080, function (canvas) {
                                    // save canvas image as data url (png format by default)
                                    var blob = dataURItoBlob(canvas.toDataURL("image/jpeg"));

                                    new ImageCompressor(blob, {
                                        quality: 1,
                                        width: 1920,
                                        height: 1080,
                                        success(result) {
                                            imageUploading["status"] = false;
                                            imageUploading["progress"] = 0;
                                            imageUploading["name"] = "";
                                            Session.set("image-uploading", imageUploading);
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



                }); */


            };

            reader.readAsDataURL(ev.files[0]);

        }
    }
});