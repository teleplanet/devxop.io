Template.registerHelper("formatCurrency", function (amount, point) {

    if(!amount){
        return "";
    }

    amount = parseFloat(amount);

    if(point == "neg"){
        return "-" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "€";
    }else if(point == "pos"){
        return "+" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "€";
    }

    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "€";
});


Template.registerHelper("formatPercent", function (amount, decimal = 2) {

    if(!amount){
        return "";
    }

    amount = parseFloat(amount);

    return amount.toFixed(decimal) + "%";
    
});


