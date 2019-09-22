Template.pagers.onRendered(function () {

    $(document).ready(function () {
        $('#pager-tabs').tabs();
    });

    let pagers = Pagers.find().fetch();

    if (pagers.length < 1) {
        console.log('[FXT] Setting up 24 virtual pagers');

        for (let i = 1; i < 25; i++) {
            Pagers.insert({
                "user_id": Meteor.userId(),
                "name": "Pager " + i,
                "index": i,
                "state": 1
            });
        }
    }
});


Template.pagers.helpers({
    'pagers': function () {
        return Pagers.find().fetch();
    },
    'isActive': function (state, comparison) {
        if(state == comparison){
            return "active";
        }else{
            return "";
        }
    }

});


Template.pagers.events({
    'click .js-state-select': function (event) {
        let pagerId = $(event.target).data("pager-id");
        let state = $(event.target).data("state");

        Pagers.update(pagerId, {
            $set: {
                "state": state
            },
        })

        return;
    }
});