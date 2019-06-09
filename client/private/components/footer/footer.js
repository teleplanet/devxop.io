Template.footer.helpers({
	'postCount':function(){
		Meteor.call("getPostCount", function(err, data){
			if(err){
				console.log(err);
			}else{
				Session.set("postCount", data);
			}
		});

		return Session.get("postCount");
	},
	'answerCount':function(){
		Meteor.call("getAnswerCount", function(err, data){
			if(err){
				console.log(err);
			}else{
				Session.set("answerCount", data);
			}
		});

		return Session.get("answerCount");
	}
});