Template.adminCollections.helpers({
    'collections': function () {
        return Collections.find().fetch();
    },
    'stringObj': function (obj) {
        return JSON.stringify(obj, undefined, 2);
    }
});

Template.adminCollections.events({
    'click .js-col-edit': function (event) {
        let id = $(event.target).data("col-id");

        let text = $("#textarea-" + id).val();

        if(!text){
            //console.log("no text");
        }else{
            //console.log(text);

            try{
                let obj = JSON.parse(text);
                console.log(obj);

                Meteor.call("admin.collections.edit", id, obj);
            }catch(e){  
                //console.log(e);
                alert("invalid objext text");
            }
        }
    },
});