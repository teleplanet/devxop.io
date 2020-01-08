Meteor.methods({
    'expenses.insert': function (data) {

        let id = Expenses.insert(data);

        return true;

    },
    'expenses.remove': function (id) {
        let revenue = Expenses.remove({
            '_id': id,
        });

        return true;

    }
})