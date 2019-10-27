Meteor.publish('user.plan.subscriptions', function(){

    return PlanSubscriptions.find({"user_id": this.userId});

	
});

Meteor.publish('user.plan.archive', function(){

    return PlanSubscriptionsArchive.find({"user_id": this.userId});

	
});

Meteor.publish('user.plan', function(){
    let user = Meteor.users.find({"_id": this.userId});

    if(user["plan"]){
        return Plans.find({"plan_id": user.plan.plan_id});
    }else{
        return [];
    }

	
});