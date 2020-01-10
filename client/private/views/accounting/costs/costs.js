Template.costs.events({
    'click .js-add-cost': function(){
        Costs.insert({
            name: "",
            amount: 0,
            stamp_created: new Date().getTime()
        })  ; 
    },
    'change .js-edit-cost': function(event){
        let id = $(event.target).data("id"),
            key = $(event.target).data("key"),
            value =  $(event.target).val();

        let data = {};

        data[key] = value;

        Costs.update(id, {
            $set: data
        });
    },
    'click .js-remove-cost': function(){
        event.preventDefault();

        let id = event.target.id;


        Costs.remove(id);
    }
});

Template.costs.helpers({
    'costs': function(){
        return Costs.find({}, { sort: { "issued.stamp": -1 } }).fetch();
    }
});