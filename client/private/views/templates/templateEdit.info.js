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

    },
    'isTwoColumn': function (style) {
        return style == "two-column";
    },
    
});