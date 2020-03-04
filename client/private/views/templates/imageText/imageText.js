Template.imageText.onRendered(function () {
    var controller = Iron.controller();
    controller.render('imageTextInfo', { to: 'nav-panel-info' });

});

Template.imageText.events({
    'click .js-add-text': function (event) {
        let template = TemplatesImageText.findOne();
        let index = template.text_index;

        if (template) {

            let text = template.texts;

            let data = {
                "value": "New Text",
                "style": { "color": "red" },
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
});


Template.displayImageText.onRendered(function () {
    Tracker.autorun(function () {
        let template = TemplatesImageText.findOne();

        if (!template) {
            TemplatesImageText.insert({
                "image": "http://localhost:3000/cfs/files/images/J4XFkuh6XcTgfwonM?token=eyJhdXRoVG9rZW4iOiJ3Z2hIUjd6ZDJ3Uk5nUkxtZS1SYmlZSW8zQ2p6dnphOXVnQmJrNExsNFFNIn0%3D?1583141170158",
                "texts": [{
                    "value": "this is string 1",
                    "style": {},
                    "originals": {},
                },{
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
    });
});

/* Template.test.onCreated(function () {


})
 */

Template.displayImageText.helpers({
    "template": function () {
        return TemplatesImageText.findOne();
    },
    "text2": function () {
        return TemplatesImageText.findOne()["text2"];
    },
    "parseStyle": function(style){
        return createMarkup(style);
    }
});

Template.displayImageText.events({
    'click .js-select-text': function(event){
        let template = TemplatesImageText.findOne();
        let index = $(event.target).data("index");

        TemplatesImageText.update(template._id, {
            $set: {
                "text_index": index,
            }
        });
    },
});