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
                        "image": image.url(),
                    }
                });
            }
        });

        return false;
    },
    'click .js-generate': function(){
        let template = Session.get("imageText-edit");

        console.log("generating...");
        let elem = $("#image-text-iframe").contents().find('.image-text-wrapper')[0];
        var o = domJSON.toJSON(elem);
        console.log(o);
        //$(".image-text-wrapper").html("");

        var DOMDocumentFragment = domJSON.toDOM(o);

    

        TemplatesImageText.update(template._id, {
            $set: {
                "domJSON": o,
                "DOM": elem.outerHTML
            }
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

    Tracker.autorun(function () {
        let template = Session.get("imageText-edit");
        //console.log("template changed!");

        if (template.image) {
            toDataUrl(template.image, function (myBase64) {
                //console.log(myBase64); // myBase64 is the base64 string
                $("#image").css("background-image", "url(" + myBase64 + ")");
            });
        }

        


        //$(".image-text-wrapper").html(DOMDocumentFragment);

        /* if (!template) {
            TemplatesImageText.insert({
                "image": "http://localhost:3000/cfs/files/images/J4XFkuh6XcTgfwonM?token=eyJhdXRoVG9rZW4iOiJ3Z2hIUjd6ZDJ3Uk5nUkxtZS1SYmlZSW8zQ2p6dnphOXVnQmJrNExsNFFNIn0%3D?1583141170158",
                "texts": [{
                    "value": "this is string 1",
                    "style": {},
                    "originals": {},
                }, {
                    "value": "this is string 1",
                    "style": {},
                    "originals": {},
                }],

            });
        } else {
            //Session.set("text-index", template.text_index);
            //$("#image-text").cssMap(template.style);
            //log(createMarkup(template.style));
        } */
    });
});

/* Template.test.onCreated(function () {


})
 */

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
    'click .js-select-text': function (event) {
        let template = Session.get("imageText-edit");
        let index = $(event.target).data("index");

        TemplatesImageText.update(template._id, {
            $set: {
                "text_index": index,
            }
        });
    },
});