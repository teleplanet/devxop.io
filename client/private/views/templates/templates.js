Template.templates.onRendered(function(){

});

Template.templates.helpers({
    'templates': function(){
        return Templates.find().fetch();
    }
});

Template.templates.events({
    'click .js-create-template': function(){
        let categoryCount = $("#template-cat-count").val();
        let menuName = $("#template-name").val();

        if (categoryCount > 0 && categoryCount < 6 && menuName) {
            let data = [];

            for (let i = 0; i < categoryCount; i++) {
                
                let category = {
                    name: "Categoria" + i,
                    name2: "Categoria" + i,
                    data: []
                };

                data.push(category);

            }

            Templates.insert({ "name": menuName, "data": data });
        }
    },
    'click .js-template-select': function(event){
        let templateId = $(event.currentTarget).data('template-id');

        Router.go("/templates/" + templateId);
    }
});