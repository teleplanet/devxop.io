Meteor.publish('collections.private', function(){

	let plan = Meteor.user().plan;

	if(plan){
		if(plan.collections){
			return Collections.find({"user_id": this.userId});
		}else{
			return [];
		}
	}else{
		return [];
	}

	
});