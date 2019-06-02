
Template.displayLight.onRendered(function () {
    
});



Template.displayLight.helpers({
    'hasPlates': function(){
        let plates = Session.get("plates");
        if(plates){
            return true;
        }else{
            return false;
        }
    },
    'platePrimary': function () {
        let plate = Session.get("plates")[0];

        return plate;
    },
    'plateSecondary': function () {
        let plate = Session.get("plates")[1];

        return plate;
    },
    'menuTotals':function(){
        let plates = Session.get("plates");

        return {price: parseInt(plates[0].price) + parseInt(plates[1].price), kcal: parseInt(plates[0].kcal) + parseInt(plates[1].kcal)}
    }
});



