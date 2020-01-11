Template.accounting.onRendered(function () {
    var controller = Iron.controller();
    controller.render('accountingInfo', { to: 'nav-panel-info' });

    let latestYear = Revenues.findOne({}, { sort: { year: -1 }, fields: { year: 1 } }).year;
    let oldestYear = Revenues.findOne({}, { sort: { year: 1 }, fields: { year: 1 } }).year;

    let seriesNum = (parseInt(latestYear) - parseInt(oldestYear)) + 1;
    let series = [];

    let seriesColor = ["#1e88e5", "#95cc47", "#565a85", "#ffca28", "#565a85", "#8e24aa"];

    for (let i = 0; i < seriesNum; i++) {

        if(seriesColor[i]){
            series.push({ "name": latestYear - i, "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "color": seriesColor[i]});
        }else{
            series.push({ "name": latestYear - i, "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]});
        }
        
    }

    for (let i = 0; i < series.length; i++) {
        for (let z = 1; z < 13; z++) {
            
            let revenues = Revenues.find({ "year": "" + series[i].name, "month": "" + z }).fetch();
            let total = 0;

            revenues.forEach(function (revenue) {
                total = parseInt(total) + parseInt(revenue.value);
            });

            series[i].data[z - 1] = total;
        }
    }

    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Revenue'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Revenue (€)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} €</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: series,
        exporting: {
            enabled: false
        }
    });
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
    'dailyGrowthRate': function () {
        let revenues = Revenues.find({}, { sort: { "stamp": -1 }, limit: 6 }).fetch();

        if (revenues.length == 6) {
            let diff1 = ((parseInt(revenues[0].value) - parseInt(revenues[1].value)) / parseInt(revenues[1].value));
            let diff2 = ((parseInt(revenues[1].value) - parseInt(revenues[2].value)) / parseInt(revenues[2].value));
            let diff3 = ((parseInt(revenues[2].value) - parseInt(revenues[3].value)) / parseInt(revenues[3].value));
            let diff4 = ((parseInt(revenues[3].value) - parseInt(revenues[4].value)) / parseInt(revenues[4].value));
            let diff5 = ((parseInt(revenues[4].value) - parseInt(revenues[5].value)) / parseInt(revenues[5].value));

            return (((diff1 + diff2 + diff3 + diff4 + diff5) / 5) * 100).toFixed(2) + "%";

            console.log(diffPercent);

            return diffPercent.toFixed(2) + "%";
        } else {
            return "0%";
        }


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

        //add fixed costs
        let costs = Costs.find().fetch();
        let totalCosts = 0;

        for (let i = 0; i < costs.length; i++) {

            if (costs[i].amount) {
                totalCosts = parseInt(totalCosts) + parseInt(costs[i].amount);
            }

        }

        totalCosts = (totalCosts * 12);

        return (((expense / days) * 365) + totalCosts).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
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
        let expenseYear = ((expense / days) * 365) + totalCosts;
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