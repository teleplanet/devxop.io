

// Created a plugin for project portability


function createMarkup(obj) {
    var keys = Object.keys(obj)
    if (!keys.length) return ''
    var i, len = keys.length
    var result = ''

    for (i = 0; i < len; i++) {
        var key = keys[i]
        var val = obj[key]
        result += key + ':' + val + ';'
    }

    return result
}


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

Template.test.helpers({
    "style": function (key) {
        let template = TemplatesImageText.findOne();
        let index = template.text_index;
        if (key) {
            return TemplatesImageText.findOne().texts[index].style[key];
        } else {
            return TemplatesImageText.findOne().texts[index].style;
        }

    },
    "value": function (key) {
        let template = TemplatesImageText.findOne();
        let index = template.text_index;
        if (key) {
            return TemplatesImageText.findOne().texts[index].originals[key];
        } else {
            return TemplatesImageText.findOne().texts[index].originals
        }

    },
    "texts": function(){
        return TemplatesImageText.findOne().texts;
    },
    "textSelected": function(){
        let template = TemplatesImageText.findOne();
        let index = template.text_index;
        return TemplatesImageText.findOne().texts[index];
    },
});


Template.test.events({
    'change .js-edit-text': function (event) {
        let template = TemplatesImageText.findOne();
        let index = template.text_index;
        let val = $(event.target).val();


        if (template) {

            let text = template.texts[index];
            text["value"] = val;

            template.texts[index] = text;

            TemplatesImageText.update(template._id, {
                $set: {
                    "texts": template.texts,
                }
            });

        }
    },
    'change .js-imageText-edit': function (event) {
        let template = TemplatesImageText.findOne();
        let index = template.text_index;
        let val = $(event.target).val();
        let key = $(event.target).data("key");
        let unit = $(event.target).data("unit");

        console.log(event);
        console.log(val);

        if (template) {


            if($(event.target).is(':checkbox') && $(event.target).is(':checked')){
                console.log("is checkbox and cehecked");
            }

            let text = template.texts[index];
            let style = text.style;
            style[key] = val + unit;

            if(key == "padding"){
                let newVal = val + "vh " + (val*2) + "vw";
                style[key] = newVal;
            }

            let originals = text.originals;
            originals[key] = val;

            text["originals"] = originals;
            text["style"] = style;

            template.texts[index] = text;

            TemplatesImageText.update(template._id, {
                $set: {
                    "texts": template.texts,
                }
            });

        }
    },
    'change #imageText-color': function () {
        let template = TemplatesImageText.findOne();
        let index = template.text_index;
        let val = $('#imageText-color option:selected').val();


        if (template) {

            let text = template.texts[index];
            let style = text.style;
            style["color"] = val;
            let originals = text.originals;
            originals["color"] = val;

            text["originals"] = originals;
            text["style"] = style;

            template.texts[index] = text;

            TemplatesImageText.update(template._id, {
                $set: {
                    "texts": template.texts,
                }
            });

        }

    },
});
