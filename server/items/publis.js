Meteor.publish('itemsSubscriptions', function(){

	return Items.find({"user_id": this.userId}, {fields: {image:0}} );
	
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