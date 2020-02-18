
Template.templateEditInfo.onRendered(function () {

    var self = this;
    self.autorun(function () {
        let template = Session.get("template-edit");

        if (template) {
            Session.set("template-edit-index", template.editing);
        }
    });

});

Template.templateEditInfo.helpers({
    'template': function () {
        return Session.get("template-edit");
    },
    'editCategory': function () {
        let editIndex = Session.get("template-edit-index");

        if (!editIndex) return;

        if (editIndex.category_edit) {
            return Session.get("template-edit").data[editIndex.category_index];
        }
    },
    'editItem': function () {
        let editIndex = Session.get("template-edit-index");

        if (!editIndex) return;

        if (editIndex.item_edit) {
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
    'click .js-remove-row': function (event) {
        let template = Session.get("template-edit");
        let editIndex = Session.get("template-edit-index");

        let dataSet = template.data[editIndex.category_index];

        //console.log(dataSet);

        delete dataSet.data.splice(editIndex.item_index, 1);

        template.data[editIndex.category_index] = dataSet;

        Templates.update(template._id, {
            $set: {
                "data": template.data
            }
        });

    },
    'click .js-set-two-column': function (event) {
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
    'click .js-select-info': function(event){
        let template = Session.get("template-edit");
        let editIndex = Session.get("template-edit-index");
        let key = $(event.target).data("key");

        let dataSet = template.data[editIndex.category_index].data

        let style = dataSet[editIndex.item_index]["style"];

        if(typeof style != "undefined"){
            if(style == key){
                dataSet[editIndex.item_index]["style"] = "";
            }else{
                dataSet[editIndex.item_index]["style"] = key;
            }
        }
        template.data[editIndex.category_index].data = dataSet;


        Templates.update(template._id, {
            $set: {
                "data": template.data
            }
        });

    },
    'click .js-select-extra': function(event){
        let template = Session.get("template-edit");
        let editIndex = Session.get("template-edit-index");
        let key = $(event.target).data("key");

        let dataSet = template.data[editIndex.category_index].data;

        let item = dataSet[editIndex.item_index];
        

        if(typeof item.icons != "object"){
            item.icons = {};
        }

        let icon = item.icons[key];
        if(typeof icon != "undefined"){
            //update icon
            if(icon.selected){
                icon = {"selected": false, "value": key};
            }else{
                icon = {"selected": true, "value": key};
            }
        }else{
            //create icon
            icon = {"selected": true, "value": key};
        }
        
        item.icons[key] = icon;

        dataSet[editIndex.item_index] = item

        template.data[editIndex.category_index].data = dataSet;


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

        dataSet[editIndex.item_index][key] = $(event.target).val();

        template.data[editIndex.category_index].data = dataSet;

        Templates.update(template._id, {
            $set: {
                "data": template.data
            }
        });
    },
})