Template.notifications.helpers({
	getNotifications: function () {
		return Session.get("notifications");
	},
	countNotifications:function(){
		return Session.get("notifications").length;
	}
});

Template.notifications.events({
	'click .js-mark-all-as-read':function(event, template){
		Meteor.call('clearNotifications', function (err, result) {
			if(err){
                console.log(err);
			}else{
				
			}
		});
	}
});