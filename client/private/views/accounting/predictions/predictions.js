Template.predictions.events({
    'change .js-prediction-values': function (event) {
        let range = $(event.target);

        let id = range.data("key");
        let value = parseInt(range.val());

        let object = Session.get("prediction-values");
        object[id] = value;

        Session.set("prediction-values", object);
    }
});

Template.predictions.onRendered(function () {
    Session.set("prediction-values", {
        'days': 360,
        "vat": 13,
        "irc": 20
    });
});

Template.predictions.helpers({
    'format':function(amount, point){
            

        if(point == "neg"){
            return "-" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "€";
        }else if(point == "pos"){
            return "+" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "€";
        }

        return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "€";

        
    },
    'predictions': function () {

        let object = Session.get("prediction-values");

        let days = object.days;
        let vat = object.vat;
        let irc = object.irc;

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
    'results': function () {
        let values = Session.get("prediction-values");

        let days = values.days;
        let vat = values.vat;
        let irc = values.irc;

        let object = {
            "expense": {
                "value": 0,
                "percent": 0,
            },
            "revenue": {
                "value": 0,
                "percent": 0,
            },
            "cost": {
                "value": 0,
                "percent": 0,
            },
            "vat": {
                "value":   0,
                "percent": 0,
            },
            "irc": {
                "value": 0,
                "percent": 0,
            },
            "balance": {
                "value": 0,
                "percent": 0,
            },
            'profit': true
        };


        var check = moment(new Date(), 'YYYY/MM/DD');
        var year = check.format('YYYY');

    
        /* CALCULATE YEARLY REVENUE PREDICTION */
        let totalRevenues = 0;
        let revenues = Revenues.find({ "year": year }).fetch();
        revenues.map(function (doc) {
            totalRevenues = parseInt(totalRevenues) + parseInt(doc.value);
        });
        object.revenue.value = (totalRevenues / (revenues.length + 1)) * days;
    
        let totalExpenses = 0;
        let expenses = Expenses.find({ "issued.year": year }).fetch();
        expenses.map(function (doc) {
            totalExpenses = parseInt(totalExpenses) + parseInt(doc.amount);
        });
        object.expense.value = (totalExpenses / (revenues.length + 1)) * days;
    
        let totalCosts = 0;
        let costs = Costs.find().fetch();
        costs.map(function (doc) {
            totalCosts = parseInt(totalCosts) + parseInt(doc.amount);
        });
        object.cost.value = (totalCosts * (days / 30));
    
    
        object.vat.value = object.revenue.value * (vat / 100);
    
        let initialBalance = (((object.revenue.value - object.vat.value) - object.expense.value) - object.cost.value);
        if (initialBalance <= 0) {
            object.irc.value = 0;
        } else {
            object.irc.value = (initialBalance * (irc / 100));
        }
    
    
        object.balance.value = initialBalance - object.irc.value;

        let total = object.revenue.value + object.expense.value + object.cost.value + object.vat.value + object.irc.value;

        object.revenue.percent = (object.revenue.value / total) * 100;
        object.expense.percent = (object.expense.value / total) * 100;
        object.cost.percent = (object.cost.value / total) * 100;
        object.vat.percent = (object.vat.value / total) * 100;
        object.irc.percent = (object.irc.value / total) * 100;


        return object;

    }
});