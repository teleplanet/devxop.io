document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
	var instances = M.Dropdown.init(elems, {});
	
	//console.log(instances);
	
  });


Template.privateBase.onRendered(function(){
	$(".navbar-logo").css({"background-color": "#5c6bc0", "color": "#fff"});
    $(".navbar").css({"background-color": "#5c6bc0", "color": "#fff"});
    $(".navbar-item").css({"color": "#fff"});
}) ;


Template.privateBase.helpers({
	'route': function(){
		let route = Session.get("route");	

		return route;
	},
	'showSidebar':function(){
		if(Session.get("sidebar") == true){
			return true;
		}else{
			return false;
		}
	},
	'searchFocus':function(){
		return Session.get("search-focus");
	}
});

Template.privateBase.events({
	'click .js-logout': function(event, template){
		event.preventDefault();
		Meteor.logout(function(){ 
			Router.go("/");
		});
	},
});