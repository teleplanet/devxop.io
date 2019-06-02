Template.moduleDisplaySelect.events({
    'change #displaySelect':function(event){
        let val = $(event.target).val();

        console.log(val);

        Session.set("module.selectedDisplay", val);

    }
});


Template.moduleDisplaySelect.helpers({
    'displaySelected': function(){
        return Session.get("module.selectedDisplay");
    },
    'displayList':function(){

        let list = [
            "specials",
            "crepes",
            "light"
        ]

        return list;
    }
});