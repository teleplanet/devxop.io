Template.calculator.events({
    'change .js-range': function (event) {
        let range = $(event.target);

        let id = range.data("id");
        let value = parseInt(range.val());

        /* console.log(id);
        console.log(value); */

        if (value > 90000) {
            if (value > 280000) {
                range.attr('max', 600000);
            } else {
                range.attr('max', 300000);
            }

        } else {
            range.attr('max', 100000);
        }

        let object = Session.get("calculator-values");
        object[id] = value;

        Session.set("calculator-values", object);

    },
    'click .js-break-even': function () {
        let values = Session.get("calculator-values");

        let breakEven = false;

        while (!breakEven) {
            values.revenue = values.revenue + 100;

            let percentVariable = (1 - ((values.revenue - values.variable) / values.revenue));

            let monthlyExpenses = ((values.revenue * percentVariable) + values.fixed);

            let result = values.revenue - monthlyExpenses;

            let yearExpense = monthlyExpenses * 12;
            let yearRevenue = values.revenue * 12;
            let yearResult = result * 12;

            let total = yearExpense + yearRevenue + yearResult;

            if (yearResult < 0) {
                total = yearExpense + yearRevenue + Math.abs(yearResult);
            }

            let object = {
                "expense": {
                    "value": yearExpense,
                    "percent": (yearExpense / total) * 100,
                },
                "revenue": {
                    "value": yearRevenue,
                    "percent": (yearRevenue / total) * 100,
                },
                "result": {
                    "value": yearResult,
                    "percent": (yearResult / total) * 100,
                },
                'profit': true
            };

            if (yearResult < 0) {
                object.result.percent = (Math.abs(yearResult) / total) * 100;
                object.profit = false;
            }else{
                breakEven = true;
            }
        }

        let object = Session.get("calculator-values");
        object["revenue"] = values.revenue;

        Session.set("calculator-values", object);

    }
});

Template.calculator.onRendered(function () {
    Session.set("calculator-values", {
        'fixed': 10000,
        "variable": 10000,
        "revenue": 30000
    });


});

Template.calculator.helpers({
    'format': function (amount) {
        if (!amount)
            amount = 0;

        return amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "€";
    },
    'values': function () {
        return Session.get("calculator-values");
    },
    'results': function () {
        let values = Session.get("calculator-values");

        if(!values){
            values = {
                'fixed': 10000,
                "variable": 10000,
                "revenue": 30000
            };
        }

        let percentVariable = (1 - ((values.revenue - values.variable) / values.revenue));

        let monthlyExpenses = ((values.revenue * percentVariable) + values.fixed);

        let result = values.revenue - monthlyExpenses;

        let yearExpense = monthlyExpenses * 12;
        let yearRevenue = values.revenue * 12;
        let yearResult = result * 12;

        let total = yearExpense + yearRevenue + yearResult;

        if (yearResult < 0) {
            total = yearExpense + yearRevenue + Math.abs(yearResult);
        }

        let object = {
            "expense": {
                "value": yearExpense,
                "percent": (yearExpense / total) * 100,
            },
            "revenue": {
                "value": yearRevenue,
                "percent": (yearRevenue / total) * 100,
            },
            "result": {
                "value": yearResult,
                "percent": (yearResult / total) * 100,
            },
            'profit': true
        };

        if (yearResult < 0) {
            object.result.percent = (Math.abs(yearResult) / total) * 100;
            object.profit = false;
        }


        return object;

    }
});

