Template.suppliersInfo.onRendered(function(){

});

Template.suppliersInfo.events({
    'click .js-insert-supplier': function (event, template) {
        event.preventDefault();

        console.log(event);

        let name = $("#nameInsert").val(),
            description = $("#descriptionInsert").val();

        if(!name || !description){
            return;
        }


        let data = {
            "name": name,
            "description": description,
            "stamp_created": new Date().getTime()
        };

        Suppliers.insert(data);
    },
});