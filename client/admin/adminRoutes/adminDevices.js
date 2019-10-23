Template.adminDevices.helpers({
    'devices': function () {
        return Devices.find().fetch();
    },
    'stringObj': function (obj) {
        return JSON.stringify(obj, undefined, 2);
    }
});

Template.adminDevices.events({
    'click .js-device-edit': function (event) {
        let id = $(event.target).data("device-id");

        let text = $("#textarea-" + id).val();

        if(!text){
            //console.log("no text");
        }else{
            //console.log(text);

            try{
                let obj = JSON.parse(text);
                console.log(obj);

                Meteor.call("admin.devices.edit", id, obj);
            }catch(e){  
                //console.log(e);
                alert("invalid objext text");
            }
        }
    },
});