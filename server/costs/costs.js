Meteor.publish('costs', function () {

    return Costs.find({"user_id": this.userId });

});