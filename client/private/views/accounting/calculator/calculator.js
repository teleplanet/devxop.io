Template.calculator.events({
    
});

Template.calculator.onRendered(function () {
   
});

Template.calculator.helpers({
    'format':function(amount){
        return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "€"
    },
    'calculator': function () {

        
    },
});

