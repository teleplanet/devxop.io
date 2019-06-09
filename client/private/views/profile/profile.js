Session.setDefault("profile-tab", "posts");

Template.profile.helpers({
	'user':function(){
		return Session.get("userProfile");
	},
	isDetails:function(){
		if(!Session.get("userProfile").details){
			return false;
		}else{
			return true;
		}
	},
	'isUser':function(userid){
		if(userid == Meteor.userId()){
			return true;
		}else{
			return false;
		}
	},
	'tabPost':function(){
		if(Session.get("profile-tab") == "posts"){
			return true;
		}else{
			return false;
		}
	},
	'tabComment':function(){
		if(Session.get("profile-tab") == "comments"){
			return true;
		}else{
			return false;
		}
	},
	'tabAnswer':function(){
		if(Session.get("profile-tab") == "answers"){
			return true;
		}else{
			return false;
		}
	},
	'tabVote':function(){
		if(Session.get("profile-tab") == "votes"){
			return true;
		}else{
			return false;
		}
	}
});

Template.profile.events({
	'click .js-tab-post':function(event){
		tabChecked(event.currentTarget);
		Session.set("profile-tab", "posts");
	},
	'click .js-tab-comment':function(event){
		tabChecked(event.currentTarget);
		Session.set("profile-tab", "comments");
	},
	'click .js-tab-answer':function(event){
		tabChecked(event.currentTarget);
		Session.set("profile-tab", "answers");
	},
	'click .js-tab-vote':function(event){
		tabChecked(event.currentTarget);
		Session.set("profile-tab", "votes");
	}
});

var tabChecked = function(target){
    $(".profile-tab-item").removeClass("selected");
	$(target).addClass("selected");
}


Template.profileComments.helpers({
	'user':function(){
		return Session.get("userProfile");
	},
});
Template.profileAnswers.helpers({
	'user':function(){
		return Session.get("userProfile");
	},
});