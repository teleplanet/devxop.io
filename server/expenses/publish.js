Meteor.publish('expenses', function () {
    

    return Expenses.find({"user_id": this.userId });

});
