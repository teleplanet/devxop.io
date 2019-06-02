Meteor.publish('displayTemplatesSubscriptions', function(){
	return DisplayTemplates.find({});
});