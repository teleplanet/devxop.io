Template.imageText.helpers({
    'imageTexts': function () {
        return TemplatesImageText.find().fetch();
    }
});

Template.imageText.events({
    'click .js-create-imageText': function () {
        let name = $("#imageText-name").val();

        if (name) {
            TemplatesImageText.insert({
                "image": "",
                "name": name,
                "texts": [{
                    "value": "Example Text",
                    "style": {"color": "white;", "background": "red;"},
                    "originals": {},
                }],

            });
        }

    },
    'click .js-imageText-remove': function () {
        let templateId = $(event.target).data('imageText');

        console.log(templateId);
        if(templateId){
            TemplatesImageText.remove(templateId);
        }

        

    },
    'click .js-imageText-select': function (event) {
        let templateId = $(event.target).data('imageText');

        if(templateId){
            Router.go("/image/text/" + templateId);
        }

        
    },
});