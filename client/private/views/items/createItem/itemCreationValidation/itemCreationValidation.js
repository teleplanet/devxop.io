Template.itemCreationValidation.helpers({
	'getRelation':function(){
		var res;

		Meteor.call("itemCreationValidation", Session.get("item-creation-title"), function(err, data){
			if(err){
				console.log(err);
			}else{
				if(data.length <= 0){
					Router.go("/item/create/" + Session.get("item-creation-title"));
				}else{
					Session.set("item-creation-title-relation", data);
				}
			}
		});

		return Session.get("item-creation-title-relation");
	}
});

Template.itemCreationValidation.events({
	'click .js-validation-continue':function(event, template){
		Router.go("/item/create/" + Session.get("item-creation-title"));
	},
});