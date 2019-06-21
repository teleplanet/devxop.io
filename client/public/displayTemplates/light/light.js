
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

        if(!plates[0] || !plates[1]){
            return {price: "", kcal: 0}
        }

        return {price: (parseFloat(plates[0].price) + parseFloat(plates[1].price)).toFixed(2), kcal: parseInt(plates[0].kcal) + parseInt(plates[1].kcal)}
    }
});



