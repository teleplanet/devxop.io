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
                "style": {"color": "white;", "background": "red;"},
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
});


Template.displayImageText.onRendered(function () {
    /* Tracker.autorun(function () {
        let template = Session.get("imageText-edit");

        if (!template) {
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
        }
    }); */
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