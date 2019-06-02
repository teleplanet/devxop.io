import { Template } from 'meteor/templating';



var globalHelpers = {

	'simulatingTracking': function(){
		let simulate = Session.get('simulatingTracking');
		if(simulate){
			return 'On';
		}
		return 'Off';
	},

	/* TIME */
	'formatDate': function(dateObj, format){ return formatDate(dateObj, format); },
	
	'getCurrentYear': function(){ return moment().format('YYYY'); },
	
	'parseHoursToString': function(hours){ return parseHoursToString(hours); },
	
	'timeToDate': function(startDate, endDate, suffix){ return timeToDate(startDate, endDate, suffix); },
	
	'timeFromDate': function(date, suffix){ return timeFromDate(date, suffix); },

	/* USER RELATED */

	'getUserName': function(userId){ return getUserName(userId); },

	/* COMPANY RELATED */
	'getCompanyName': function(userId){ return getCompanyName(userId); },
};

_.each(globalHelpers, function(value, key){
	Template.registerHelper(key, value);
});