Template.adminUsers.helpers({
    'users': function () {
        return Meteor.users.find().fetch();
    },
    'stringObj': function (obj) {
        return JSON.stringify(obj, undefined, 2);
    }
});

Template.adminUsers.events({
    'click .js-user-edit': function (event) {
        let userId = $(event.target).data("user-id");

        let text = $("#textarea-" + userId).val();

        if(!text){
            //console.log("no text");
        }else{
            //console.log(text);

            try{
                let obj = JSON.parse(text);
                console.log(obj);

                Meteor.call("admin.users.edit", userId, obj);
            }catch(e){  
                //console.log(e);
                alert("invalid objext text");
            }
        }
    },
});