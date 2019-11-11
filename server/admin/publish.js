Meteor.publish('admin.users', function() {
	return Meteor.users.find({}, {fields: {services:0}}); //this works OK, if i query the user collection before login this will be empty
});

Meteor.publish('admin.collections', function() {
	return Collections.find(); //this works OK, if i query the user collection before login this will be empty
});

Meteor.publish('admin.items', function() {
	return Items.find(); //this works OK, if i query the user collection before login this will be empty
});

Meteor.publish('admin.devices', function() {
	return Devices.find(); //this works OK, if i query the user collection before login this will be empty
});

Meteor.publish('admin.companies', function() {
	return Companies.find(); //this works OK, if i query the user collection before login this will be empty
});


Meteor.publish('admin.messages', function() {
	return Message.find(); //this works OK, if i query the user collection before login this will be empty
});


