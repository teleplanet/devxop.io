Template.templateEditInfo.helpers({
    'template': function(){
        return Session.get("template-edit");
    },
    'editCategory': function(){
        let editIndex = Session.get("template-edit-index");
        if(editIndex.category_edit){
            return Session.get("template-edit").data[editIndex.category_index];
        }
    },
    'editItem': function(){
        let editIndex = Session.get("template-edit-index");
        if(editIndex.item_edit){
            return Session.get("template-edit").data[editIndex.category_index].data[editIndex.item_index];
        }
    },
    'isTwoColumn': function (style) {
        return style == "two-column";
    },
    
});

Template.templateEditInfo.events({
    'click .js-add-row': function (event) {
        let template = Session.get("template-edit");
        let editIndex = Session.get("template-edit-index");

        let item = {
            info1: "Novo prato info...",
            info2: "Prato info 2...",
            price: "0,00€",
            icons: "extras..",
        };
        
        template.data[editIndex.category_index].data.push(item);

        Templates.update(template._id, {
            $set: {
                "data": template.data
            }
        });

    },
    'change .js-edit-category': function (event) {
        let template = Session.get("template-edit");
        let editIndex = Session.get("template-edit-index");
        let key = $(event.target).data("key");

        let dataSet = template.data[editIndex.category_index]

        dataSet[key] = $(event.target).val();

        template.data[editIndex.category_index] = dataSet;

        Templates.update(template._id, {
            $set: {
                "data": template.data
            }
        });

    },
    'change .js-edit-item': function (event) {
        let template = Session.get("template-edit");
        let editIndex = Session.get("template-edit-index");
        let key = $(event.target).data("key");

        let dataSet = template.data[editIndex.category_index].data

        dataSet[editItem.item_index][key] = $(event.target).val();

        template.data[editIndex.category_index].data = dataSet;

        Templates.update(template._id, {
            $set: {
                "data": template.data
            }
        });
    },
})