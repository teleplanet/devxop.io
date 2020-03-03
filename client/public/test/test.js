

// Created a plugin for project portability



Template.displayImageText.onRendered(function () {
    Tracker.autorun(function () {
        let template = TemplatesImageText.findOne();

        if (!template) {
            TemplatesImageText.insert({
                "image_url": "",
                "image_data": "",
                "style": {},
                "value": {},
                "text": "",
                "text2": "",

            });
        } else {
            $("#image-text").cssMap(template.style);
        }
    });
});

/* Template.test.onCreated(function () {


})
 */

Template.displayImageText.helpers({
    "text": function(){
        return TemplatesImageText.findOne()["text"];
    },
    "text2": function(){
        return TemplatesImageText.findOne()["text2"];
    },
});

 Template.test.helpers({
    "text": function(){
        return TemplatesImageText.findOne()["text"];
    },
    "text2": function(){
        return TemplatesImageText.findOne()["text2"];
    },
    "style": function(key){
        if(key){
            return TemplatesImageText.findOne().style[key];
        }else{
            return TemplatesImageText.findOne().style
        }
        
    },
    "value": function(key){
        if(key){
            return TemplatesImageText.findOne().value[key];
        }else{
            return TemplatesImageText.findOne().value
        }
        
    }
});

Template.test.events({
    'change .js-edit-text': function (event) {
        let template = TemplatesImageText.findOne();
        let val = $(event.target).val();
        let key = $(event.target).data("key");

        if (template) {

            let text = {};
            text[key] = val;

            TemplatesImageText.update(template._id, {
                $set: text
            });

        }
    },
    'change .js-imageText-edit': function (event) {
        let template = TemplatesImageText.findOne();
        let val = $(event.target).val();
        let key = $(event.target).data("key");
        let unit = $(event.target).data("unit");


        if (template) {

            let style = template.style;
            style[key] = val + unit;

            let value = template.value;
            value[key] = val;

            TemplatesImageText.update(template._id, {
                $set: {
                    "style": style,
                    "value": value
                }
            });

        }
    },
    'change #imageText-color': function () {
        let template = TemplatesImageText.findOne();
        let val = $('#imageText-color option:selected').val();


        if (template) {

            let style = template.style;
            style["color"] = val;

            TemplatesImageText.update(template._id, {
                $set: {
                    "style": style
                }
            });

        }

    },
});
