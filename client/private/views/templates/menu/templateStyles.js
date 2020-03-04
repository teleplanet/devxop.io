Template.templateStyles.helpers({
    'styles': function(){
        return TemplateStyles.find().fetch();
    },
    'style': function(){
        let style = TemplateStyles.findOne(Session.get("selected-style"));

        return style;
    }
});

Template.templateStyles.events({
    'click .js-select-style': function(event){
        let styleId = $(event.currentTarget).data("style-id");
        console.log(styleId);

        Session.set("selected-style", styleId);
    },
    'change .js-edit-style': function(event){
        let styleId = Session.get("selected-style");
        let value = $(event.currentTarget).val();
        let key = $(event.currentTarget).data("key");

        let data = {};
        data[key] = value;

        TemplateStyles.update(styleId, {
            $set: data
        });
    },
    'click .js-create-style': function(){
        TemplateStyles.insert({
            "name": "style-" + new Date().getTime(),
            "data": ""
        });
    }
});