Template.expenses.onRendered(function () {
    var controller = Iron.controller();
    controller.render('expensesInfo', { to: 'nav-panel-info' });

    let obj = Expenses.find({}, { fields: { _id: 0, user_id: 0 } }).fetch();

    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

    $('<a class="button" href="data:' + data + '" download="expenseBackup.json">Backup</a>').appendTo('#expenseBackup');
});

Template.expenses.helpers({
    'expenses': function () {
        let expenses = Expenses.find({}, { sort: { "issued.stamp": -1 } }).fetch();

        return expenses;
    },
    'getExpenseStatus': function (expense) {
        if (expense.paid) {

            return "paid";
        } else {
            let diff = getTimeDifference(new Date(), new Date(expense.due.stamp), "days");

            if (diff <= 3) {

                if (diff < 0) {
                    return "overdue";
                }

                return "pending";
            } else if (diff > 3) {
                return "pending";
            }

        }
    }
});

Template.expenses.events({
    'change #uploadBackup': function (event) {
        let ev = event.target;

        if (ev.files && ev.files[0]) {

            var reader = new FileReader();

            reader.onload = function (e) {
                var result = JSON.parse(e.target.result);

                result.forEach(function(expense){
                    Expenses.insert(expense);

                    window.setTimeout(function(){}, 400);
                });
                
            };

            reader.readAsText(ev.files[0]);

        }
    },
    'click .js-remove-expense': function (event, template) {
        event.preventDefault();

        let id = event.target.id;


        Expenses.remove(id);
    },
    'change .js-paid-check': function (event) {
        event.preventDefault();

        let id = event.target.id;

        Expenses.update(id, {
            $set: {
                "paid": $(event.target).is(":checked"),
            }
        });
    }
});