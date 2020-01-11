Template.previsions.events({
    'change .js-prevision-values': function (event) {

    }
});

Template.previsions.onRendered(function () {
    var check = moment(new Date(), 'YYYY/MM/DD');
    var year = check.format('YYYY');

    let days = $(".form-control#days").val();
    let vat = $(".form-control#vat").val();
    let irc = $(".form-control#irc").val();

    let previsions = {
        "revenues": 0,
        "expenses": 0,
        "costs": 0,
        "vat": 0,
        "irc": 0,
        "balance": 0,
    }

    /* CALCULATE YEARLY REVENUE PREDICTION */
    let totalRevenues = 0;
    let revenues = Revenues.find({ "year": year }).fetch();
    revenues.map(function (doc) {
        totalRevenues = parseInt(totalRevenues) + parseInt(doc.value);
    });
    previsions.revenues = (totalRevenues / (revenues.length + 1)) * days;

    let totalExpenses = 0;
    let expenses = Expenses.find({ "issued.year": year }).fetch();
    expenses.map(function (doc) {
        totalExpenses = parseInt(totalExpenses) + parseInt(doc.amount);
    });
    previsions.expenses = (totalExpenses / (revenues.length + 1)) * days;

    let totalCosts = 0;
    let costs = Costs.find().fetch();
    costs.map(function (doc) {
        totalCosts = parseInt(totalCosts) + parseInt(doc.amount);
    });
    previsions.costs = (totalCosts * (days / 30));


    previsions.vat = previsions.revenues * (vat / 100);

    let initialBalance = ((previsions.revenues - previsions.expenses) - previsions.costs);
    console.log(initialBalance);
    if (initialBalance <= 0) {
        previsions.irc = 0;
    } else {
        previsions.irc = (initialBalance * (irc / 100));
    }


    console.log(previsions)
});

Template.previsions.helpers({
    'previsions': function () {
        return;
    },
    'yearTaxCollective': function (revenue, expense) {

        let days = moment().dayOfYear();

        let revenueYear = ((revenue / days) * 365);
        let expenseYear = ((expense / days) * 365);
        let tax = 0.13;

        let costs = Costs.find().fetch();
        let totalCosts = 0;

        for (let i = 0; i < costs.length; i++) {

            if (costs[i].amount) {
                totalCosts = parseInt(totalCosts) + parseInt(costs[i].amount);
            }

        }

        totalCosts = totalCosts * 12


        let balance = ((revenueYear * (1 - tax)) - (expenseYear + totalCosts));


        if (balance < 0) {
            return 0;
        } else {
            if (balance <= 15000) {
                let irc = 0.17;
                return (balance - (balance * (1 - irc))).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            } else if (balance > 15000) {
                let irc = 0.21;
                return (balance - (balance * (1 - irc))).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            } else {
                return 0.0;
            }
        }


    },
    'yearBalance': function (revenue, expense) {
        let days = moment().dayOfYear();

        let costs = Costs.find().fetch();
        let totalCosts = 0;

        for (let i = 0; i < costs.length; i++) {

            if (costs[i].amount) {
                totalCosts = parseInt(totalCosts) + parseInt(costs[i].amount);
            }

        }

        totalCosts = totalCosts * 12

        let revenueYear = ((revenue / days) * 365);
        let expenseYear = ((expense / days) * 365);
        let tax = 0.13;

        let balance = 0;

        if (revenueYear <= 0) {
            balance = (revenueYear - expenseYear);
        } else {
            balance = ((revenueYear * (1 - tax)) - expenseYear);
        }


        let ircTax = 0;

        if (balance < 0) {

        } else {
            if (balance < 15000) {
                let irc = 0.17;
                ircTax = (balance - (balance * (1 - irc)));
            } else if (balance > 15000) {
                let irc = 0.21;
                ircTax = (balance - (balance * (1 - irc)));
            }
        }


        return (balance - ircTax).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    },
});