Template.expenses.onRendered(function () {
    var controller = Iron.controller();
    controller.render('expensesInfo', { to: 'nav-panel-info' });


});

Template.expenses.helpers({
    'expenses': function () {
        let expenses = Expenses.find({}, { sort: { "issued.stamp": -1 } }).fetch();

        return expenses;
    },
    'getExpenseStatus': function(expense){
        if(expense.paid){
            
            return "paid";
        }else{        
            let diff = getTimeDifference(new Date(), new Date(expense.due.stamp), "days");

            if(diff <= 3){

                if(diff < 0){
                    return "overdue";
                }

                return "pending";
            }else if(diff > 3){
                return "pending";
            }

        }
    }
});

Template.expenses.events({
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