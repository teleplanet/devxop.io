String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1)
}

Router.route('/display', {
	name: "displayBase",
	layoutTemplate: 'displayBase',
	waitOn: function () {
		let query = this.params.query;
		let deviceId = query.deviceId;

		return [
			Meteor.subscribe('getDevice', deviceId)
		]
	},
	action: function () {
		if(this.ready()){
			this.render("display");
		}else{
			this.next();
		}
		

	}
});