Meteor.publish('templates', function () {
    //console.log(this.userId);
    return Templates.find({"user_id": this.userId });

});

Meteor.publish('templates.imageText', function () {
    //console.log(this.userId);
    return TemplatesImageText.find({"user_id": this.userId });

});

Meteor.publish('templates.styles', function () {
    //console.log(this.userId);
    return TemplateStyles.find({"user_id": this.userId });

});