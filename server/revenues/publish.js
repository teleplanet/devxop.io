Meteor.publish('revenues', function () {

    return Revenues.find({"user_id": this.userId });

});
