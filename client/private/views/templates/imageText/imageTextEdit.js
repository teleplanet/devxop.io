
import ImageCompressor from 'image-compressor.js';

Template.imageTextEdit.onRendered(function () {
    var controller = Iron.controller();
    controller.render('imageTextInfo', { to: 'nav-panel-info' });

});

Template.imageTextEdit.events({

    'click .js-add-text': function (event) {
        let template = Session.get("imageText-edit");
        let index = template.text_index;

        if (template) {

            let text = template.texts;

            let data = {
                "value": "New Text",
                "style": { "color": "white;", "background": "red;" },
                "originals": {},
            };

            text.push(data);

            TemplatesImageText.update(template._id, {
                $set: {
                    "texts": template.texts,
                    "text_index": text.length - 1,
                }
            });

        }
    },
    'click .js-add-image': function (event) {
        event.preventDefault();

        imageListModal(function (err, image) {
            if (image) {
                let template = Session.get("imageText-edit");
                TemplatesImageText.update(template._id, {
                    $set: {
                        "image_url": image.url(),
                    }
                });
            }
        });

        return false;
    },
    'click .js-generate': function () {
        let template = Session.get("imageText-edit");

        console.log("generating...");
        let elem = $("#image-text-iframe").contents().find('.image-text-wrapper')[0];
        /* var o = domJSON.toJSON(elem);
        console.log(o);
        //$(".image-text-wrapper").html("");

        var DOMDocumentFragment = domJSON.toDOM(o);

    

        TemplatesImageText.update(template._id, {
            $set: {
                "domJSON": o,
                "DOM": elem.outerHTML
            }
        }); */


        // You can then get the data URL when the image got loaded:
        let width = "1920";
        let height = "1080";

        $("#image-text-iframe").css({ "width": width + "px", "height": height + "px" });

        /* if(typeof rotation != "undefined"){
            if(rotation == "90"){
                $(elem).addClass("rotate90");
            }else if(rotation == "-90"){
                $(elem).addClass("rotate90");
                $(elem).addClass("anticlock");
            }
        } */


        /* $("#template-edit-iframe").css({ "right": "-100%", "position": "absolute" }); */
        document.html2canvas(elem, { "width": width, "height": height, "userCORS": true }).then(canvas => {

            var blob = dataURItoBlob(canvas.toDataURL("image/jpeg"));

            new ImageCompressor(blob, {
                quality: 1,
                width: width,
                height: height,
                success(result) {
                    var imageObj = new FS.File(result);
                    imageObj['user_id'] = Meteor.userId();
                    imageObj['imageText_id'] = template._id;

                    //check existense
                    let exists = Images.findOne({ "user_id": Meteor.userId(), "imageText_id": template._id });
                    if (exists) {
                        Images.remove(exists._id);
                    }

                    Images.insert(imageObj, function (err, image) {
                        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                        if (err) {
                            console.log(err);
                        } else {
                            scaleImage(canvas.toDataURL("image/jpeg"), 720, 480, function (canvas) {
                                var blob = dataURItoBlob(canvas.toDataURL("image/jpeg"));
                                new ImageCompressor(blob, {
                                    quality: 1,
                                    width: 720,
                                    height: 480,
                                    success(result) {

                                        var thumbObj = new FS.File(result);
                                        thumbObj['user_id'] = Meteor.userId();
                                        thumbObj['imageText_id'] = template._id;
                                        Thumbnails.insert(thumbObj, function (err, thumbnail) {
                                            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                                            if (err) {
                                                console.log(err);
                                            } else {

                                                TemplatesImageText.update(template._id, {
                                                    $set: {
                                                        "image": imageObj._id,
                                                        "image_thumb": thumbObj._id,
                                                    }
                                                });

                                                let devices = Devices.find({ "display_types.imageText.id": template._id }).fetch();
                                                if (devices) {
                                                    for (let i = 0; i < devices.length; i++) {
                                                        let device = devices[i];
                                                        //console.log("Device updating..." + device._id);
                                                        Devices.update(device._id, {
                                                            $set: {
                                                                "update": true
                                                            }
                                                        });
                                                    }

                                                }

                                                $(event.currentTarget).show();

                                                Router.go("/image/text");
                                            }
                                        });

                                    },
                                    error(e) {
                                        console.log(e.message);
                                    },
                                });
                            });

                        }
                    });



                },
                error(e) {
                    console.log(e.message);
                },

            });
            $("#image-text-iframe").css({ "width": "720px", "height": "480px" });
        });
    }
});


function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}


Template.displayImageText.onRendered(function () {
    this.sessionWatcher = Session.watch('imageText-edit', function (value) {
        let template = value;
        setTimeout(() => {
           setDraggables(); 
        }, 500);
        
        console.log("template changed!");

        if (template.image_url) {
            toDataUrl(template.image_url, function (myBase64) {
                //console.log(myBase64); // myBase64 is the base64 string
                $("#image").css("background-image", "url(" + myBase64 + ")");
            });
        }
    });

});

/* Template.onCreated(function () {
    Tracker.autorun(function () {
        let template = Session.get("imageText-edit");
        setDraggables();
        //console.log("template changed!");

        if (template.image_url) {
            toDataUrl(template.image_url, function (myBase64) {
                //console.log(myBase64); // myBase64 is the base64 string
                $("#image").css("background-image", "url(" + myBase64 + ")");
            });
        }

    });
}); */


setDraggables = function () {
    $('.js-select-text').each(function (i, obj) {
        $(this).draggable({
            stop: function () {
                var finalOffset = $(this).offset();
                var finalxPos = finalOffset.left;
                var finalyPos = finalOffset.top;
                let template = Session.get("imageText-edit");

                //$(this).text('Final X: ' + finalxPos + " | Final X: " + finalyPos);
                let left = pxToVw(finalxPos);
                let top = pxToVh(finalyPos);

                let index = $(this).data("index");
                let text = template.texts[index];
                let style = text.style;
                style["left"] = left + "vw";
                style["top"] = top + "vh";
                let originals = text.originals;
                originals["left"] = left;
                originals["top"] = top;

                text["originals"] = originals;
                text["style"] = style;

                template.texts[index] = text;

                TemplatesImageText.update(template._id, {
                    $set: {
                        "texts": template.texts,
                    }
                });

            },
        }
        );
    });
}
Template.imageTextEdit.helpers({
    "template": function () {
        return Session.get("imageText-edit");
    },
});

Template.displayImageText.helpers({
    "template": function () {
        return Session.get("imageText-edit");
    },
    "text2": function () {
        return Session.get("imageText-edit")["text2"];
    },
    "parseStyle": function (style) {
        return createMarkup(style);
    }
});


Template.displayImageText.events({
    'mousedown .js-select-text': function (event) {
        let template = Session.get("imageText-edit");
        let index = $(event.target).data("index");
        let target = $(event.target);

        TemplatesImageText.update(template._id, {
            $set: {
                "text_index": index,
            }
        });


    },

});
