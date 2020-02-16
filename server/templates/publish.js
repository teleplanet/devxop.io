Meteor.publish('templates', function () {
    //console.log(this.userId);
    return Templates.find({"user_id": this.userId });

});