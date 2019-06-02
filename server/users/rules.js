//	Security measure to disable any updates to a user collection from the client side.
//	Only use methods to update user collection (or any other for that matter)
//	See: https://guide.meteor.com/security.html

Meteor.users.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; },
});