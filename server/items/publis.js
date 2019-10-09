Meteor.publish('itemsSubscriptions', function(){

	let plan = Meteor.user().plan;

	if(plan){
		if(plan.items){
			return Items.find({"user_id": this.userId}, {fields: {image:0}} );
		}else{
			return [];
		}
	}else{
		return [];
	}
	
});

Meteor.publish('items.public', function(){


	return Items.find({});
});


Meteor.publish('items.device', function(items){

	if(items){
		return Items.find({"_id": { "$in" : items} });
	}else{
		return [];
	}

	
});