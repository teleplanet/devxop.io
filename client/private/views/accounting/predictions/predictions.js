Template.predictions.events({
    'change .js-prediction-values': function (event) {
        let key = $(event.target).data("key");

        Session.set("predictions-" + key, $(event.target).val());
    }
});

Template.predictions.onRendered(function () {
    let days = $(".form-control#days").val();
        let vat = $(".form-control#vat").val();
        let irc = $(".form-control#irc").val();

    Session.set("predictions-days", days);
    Session.set("predictions-vat", vat);
    Session.set("predictions-irc", irc)
});

Template.predictions.helpers({
    'format':function(amount){
        return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "€"
    },
    'predictions': function () {

        let days = Session.get("predictions-days");
        let vat = Session.get("predictions-vat");
        let irc = Session.get("predictions-irc");

        let predictions = {
            "revenues": 0,
            "expenses": 0,
            "costs": 0,
            "vat": 0,
            "irc": 0,
            "balance": 0,
        }
        Session.set("predictions", predictions);
    
        var check = moment(new Date(), 'YYYY/MM/DD');
        var year = check.format('YYYY');

    
        /* CALCULATE YEARLY REVENUE PREDICTION */
        let totalRevenues = 0;
        let revenues = Revenues.find({ "year": year }).fetch();
        revenues.map(function (doc) {
            totalRevenues = parseInt(totalRevenues) + parseInt(doc.value);
        });
        predictions.revenues = (totalRevenues / (revenues.length + 1)) * days;
    
        let totalExpenses = 0;
        let expenses = Expenses.find({ "issued.year": year }).fetch();
        expenses.map(function (doc) {
            totalExpenses = parseInt(totalExpenses) + parseInt(doc.amount);
        });
        predictions.expenses = (totalExpenses / (revenues.length + 1)) * days;
    
        let totalCosts = 0;
        let costs = Costs.find().fetch();
        costs.map(function (doc) {
            totalCosts = parseInt(totalCosts) + parseInt(doc.amount);
        });
        predictions.costs = (totalCosts * (days / 30));
    
    
        predictions.vat = predictions.revenues * (vat / 100);
    
        let initialBalance = (((predictions.revenues - predictions.vat) - predictions.expenses) - predictions.costs);
        if (initialBalance <= 0) {
            predictions.irc = 0;
        } else {
            predictions.irc = (initialBalance * (irc / 100));
        }
    
    
        predictions.balance = initialBalance - predictions.irc;
    
    
        //Session.set("predictions", predictions);

        return predictions;
    },
});