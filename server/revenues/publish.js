Meteor.publish('revenues', function () {

    return Revenues.find({"user_id": this.userId });

});


Meteor.publish('invoices', function () {

    return Invoices.find({"user_id": this.userId });

});
