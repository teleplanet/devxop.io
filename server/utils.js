Meteor.methods({
    'server.log': function (data) {

        console.log(data);

        return true;
	}
})