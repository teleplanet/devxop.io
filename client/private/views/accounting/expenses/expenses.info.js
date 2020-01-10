Template.expensesInfo.onRendered(function(){
    $('#dateIssuedInsert').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2010,
        maxYear: parseInt(moment().format('YYYY'), 10)
    }, function (start, end, label) {

        Session.set("insert-issued-date", moment(start).valueOf());
    });

    $('#dateDueInsert').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2010,
        maxYear: parseInt(moment().format('YYYY'), 10)
    }, function (start, end, label) {

        Session.set("insert-due-date", moment(start).valueOf());
    });

    Session.set("insert-issued-date", moment().valueOf());
    Session.set("insert-due-date", moment().valueOf());
});

Template.expensesInfo.events({
    'click .js-insert-expense': function (event, template) {
        event.preventDefault();

        let supplier = Session.get("module.selectedSupplier"),    
            issued = Session.get("insert-issued-date"),
            due = Session.get("insert-due-date"),
            paid = $("#paidInsert").is(":checked"),
            invoice = $("#invoiceInsert").val(),
            //moment($("#dateInsert").val()).valueOf(),
            amount = $('#amountInsert').val();

        if(!issued || !supplier || !due || !amount || !invoice){
            console.log(issued);
            console.log(supplier);
            console.log(due);
            console.log(amount);
            return;
        }

        let issuedDate = moment(new Date(issued), 'YYYY/MM/DD');
        let dueDate = moment(new Date(due), 'YYYY/MM/DD');


        let data = {
            "supplier": supplier,
            "invoice_id": invoice,
            "issued": {
                "stamp": issued,
                "month": issuedDate.format('M'),
                "year": issuedDate.format('YYYY'),
                "day": issuedDate.format('D')
            },
            "due": {
                "stamp": due,
                "month": dueDate.format('M'),
                "year": dueDate.format('YYYY'),
                "day": dueDate.format('D')
            },
            "paid": paid,
            "amount": amount,
            "stamp_created": new Date().getTime()
        }
        Expenses.insert(data);
    },
});