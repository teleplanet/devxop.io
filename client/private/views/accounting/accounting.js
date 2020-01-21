Template.accounting.onRendered(function () {
    var controller = Iron.controller();
    controller.render('accountingInfo', { to: 'nav-panel-info' });

    let latestYear = Revenues.findOne({}, { sort: { year: -1 }, fields: { year: 1 } }).year;
    let oldestYear = Revenues.findOne({}, { sort: { year: 1 }, fields: { year: 1 } }).year;

    let seriesNum = (parseInt(latestYear) - parseInt(oldestYear)) + 1;
    let series = [];

    let seriesColor = ["#1e88e5", "#95cc47", "#565a85", "#ffca28", "#565a85", "#8e24aa"];

    for (let i = 0; i < seriesNum; i++) {

        if (seriesColor[i]) {
            series.push({ "name": latestYear - i, "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "color": seriesColor[i] });
        } else {
            series.push({ "name": latestYear - i, "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });
        }

    }

    for (let i = 0; i < series.length; i++) {
        for (let z = 1; z < 13; z++) {

            let revenues = Revenues.find({ "year": "" + series[i].name, "month": "" + z }).fetch();
            let total = 0;

            revenues.forEach(function (revenue) {
                total = parseFloat(total) + parseFloat(revenue.value);
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
    'stats': function () {

        let results = {
            'days': 1,
            'currentYear': 0,
            'lastYear': 0,
            'expenses': 0,
            'growth': 0.0,
            'balance': 0,
            'dailyGrowth': false //if not enought data / check last 6 day growth rate
        }


        var check = moment(new Date(), 'YYYY/MM/DD');
        var month = check.format('M');
        var year = check.format('YYYY');

        let expenses = Expenses.find({ "issued.year": year }).fetch();
        for (let i = 0; i < expenses.length; i++) {
            results.expenses = results.expenses + parseFloat(expenses[i].amount);
        }

        let currentYearRevenues = Revenues.find({ "year": year, "month": month }, { sort: { stamp: -1 } }).fetch();

        results.days = currentYearRevenues.length + 1;
        for (let i = 0; i < currentYearRevenues.length; i++) {

            let currentRevenue = currentYearRevenues[i];
            results.currentYear = parseFloat(results.currentYear) + parseFloat(currentRevenue.value);

            let previous = moment(new Date(currentRevenue.stamp), "YYYY/MM/DD").subtract(1, "year");
            var previousYear = previous.format('YYYY');

            let previousRevenue = Revenues.findOne({ "year": previousYear, "month": currentRevenue.month, "day": currentRevenue.day });

            if (previousRevenue) {
                results.lastYear = parseFloat(results.lastYear) + parseFloat(previousRevenue.value);
            } else {
                results.dailyGrowth = true;
            }

        }

        if (results.dailyGrowth) {
            let revenues = Revenues.find({}, { sort: { "stamp": -1 }, limit: 6 }).fetch();

            if (revenues.length == 6) {
                let diff1 = ((parseInt(revenues[0].value) - parseInt(revenues[1].value)) / parseInt(revenues[1].value));
                let diff2 = ((parseInt(revenues[1].value) - parseInt(revenues[2].value)) / parseInt(revenues[2].value));
                let diff3 = ((parseInt(revenues[2].value) - parseInt(revenues[3].value)) / parseInt(revenues[3].value));
                let diff4 = ((parseInt(revenues[3].value) - parseInt(revenues[4].value)) / parseInt(revenues[4].value));
                let diff5 = ((parseInt(revenues[4].value) - parseInt(revenues[5].value)) / parseInt(revenues[5].value));

                results.growth = (((diff1 + diff2 + diff3 + diff4 + diff5) / 5) * 100);
            }
        }else{
            results.growth = ((results.currentYear - results.lastYear) / results.lastYear) * 100;
        }


        
        results.balance = (results.currentYear - results.expenses);


        return results;
    },
    'currentBalance': function (revenue, expense) {

        let balance = (revenue - expense);

        return balance;
    },
});