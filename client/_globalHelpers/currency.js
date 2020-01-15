Template.registerHelper("formatCurrency", function (amount, point) {
    if(point == "neg"){
        return "-" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "€";
    }else if(point == "pos"){
        return "+" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "€";
    }

    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "€";
});
