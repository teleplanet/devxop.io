Template.imageTextInfo.helpers({
    "style": function (key) {
        let template = Session.get("imageText-edit");
        let index = template.text_index;
        if (key) {
            return template.texts[index].style[key];
        } else {
            return template.texts[index].style;
        }

    },
    "value": function (key) {
        let template = Session.get("imageText-edit");
        let index = template.text_index;
        if (key) {
            return template.texts[index].originals[key];
        } else {
            return template.texts[index].originals
        }

    },
    "texts": function(){
        return Session.get("imageText-edit").texts;
    },
    "textSelected": function(){
        let template = Session.get("imageText-edit");
        let index = template.text_index;
        return template.texts[index];
    },
    "isChecked": function(key, value){
        let template = Session.get("imageText-edit");
        let index = template.text_index;

        let val = template.texts[index].originals[key];

        if(val == value){
            return "checked";
        }

    }
});


Template.imageTextInfo.events({
    'click .js-remove-text': function (event) {
        let template = Session.get("imageText-edit");
        let index = template.text_index;

        if (template) {

            let text = template.texts;

            delete text.splice(index, 1);

            TemplatesImageText.update(template._id, {
                $set: {
                    "texts": template.texts
                }
            });

        }
    },
    'change .js-imageText-edit': function (event) {
        let template = Session.get("imageText-edit");
        let index = template.text_index;
        let val = $(event.target).val();
        let key = $(event.target).data("key");
        let unit = $(event.target).data("unit");

        if (template) {
            if($(event.target).is(':checkbox') && !$(event.target).is(':checked')){
                val = "";
            }

            let text = template.texts[index];
            let style = text.style;
            let originals = text.originals;

            if(key == "padding"){
                let newVal = val + "vh " + (val*2) + "vw";
                style[key] = newVal;
            }else if(key == "value"){
                text["value"] = val;
            }else{
                style[key] = val + unit;
                originals[key] = val;
            }

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
        let template = Session.get("imageText-edit");
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
