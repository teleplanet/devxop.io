Meteor.publish('suppliers', function () {
    

    return Suppliers.find({"user_id": this.userId });

});
