Template.accounting.onRendered(function () {
    var controller = Iron.controller();
    controller.render('accountingInfo', { to: 'nav-panel-info' });
});

Template.accounting.helpers({
    'getYears': function () {
        let check = moment(new Date(), 'YYYY/MM/DD');
        let old = moment(new Date()).subtract(1, 'year');

        return { "current": check.format('YYYY'), "old": old.format('YYYY') }
    },
    'expenseTotal': function () {
        var check = moment(new Date(), 'YYYY/MM/DD');
        var year = check.format('YYYY');

        let expenses = Expenses.find({ "issued.year": year }).fetch();
        let total = 0;

        for (let i = 0; i < expenses.length; i++) {
            total = parseInt(total) + parseInt(expenses[i].amount);
        }

        return total;
    },
    'currentYearTotal': function () {
        var check = moment(new Date(), 'YYYY/MM/DD');

        var month = check.format('M');
        var year = check.format('YYYY');

        let revenues = Revenues.find({ "year": year, "month": month }).fetch();

        let total = 0;

        for (let i = 0; i < revenues.length; i++) {
            total = parseInt(total) + parseInt(revenues[i].value);
        }

        return total;
    },
    'lastYearTotal': function () {
        var check = moment(new Date(), 'YYYY/MM/DD');

        var old = moment(new Date()).subtract(1, 'year');
        var month = check.format('M');

        let revenuesOld = Revenues.find({ "year": old.format('YYYY'), "month": month }).fetch();

        let oldTotal = 0;

        for (let i = 0; i < revenuesOld.length; i++) {
            oldTotal = parseInt(oldTotal) + parseInt(revenuesOld[i].value);
        }

        return oldTotal;
    },
    'diffPreviousYear': function (total, oldTotal) {

        let diffPercent = ((total - oldTotal) / oldTotal) * 100;

        return diffPercent.toFixed(2) + "%";
    },
    'currentBalance': function (revenue, expense) {

        let balance = (revenue - expense);

        return balance;
    },
    'yearRevenue': function (revenue) {
        let days = moment().dayOfYear();
        let tax = 0.13;
        return (((revenue / days) * 365) * (1 - tax)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
    'yearExpense': function (expense) {
        let days = moment().dayOfYear();

        return ((expense / days) * 365).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    },
    'yearTaxCollective': function (revenue, expense) {

        let days = moment().dayOfYear();

        let revenueYear = ((revenue / days) * 365);
        let expenseYear = ((expense / days) * 365);
        let tax = 0.13;


        let balance = ((revenueYear * (1 - tax)) - expenseYear);

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

        console.log(balance);

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