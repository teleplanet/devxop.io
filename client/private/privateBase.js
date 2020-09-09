/* document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
	var instances = M.Dropdown.init(elems, {});
	
	//console.log(instances);
	
  }); */


Template.privateBase.onRendered(function(){
	/* $(".navbar-logo").css({"background-color": "#5c6bc0", "color": "#fff"});
    $(".navbar").css({"background-color": "#5c6bc0", "color": "#fff"});
	$(".navbar-item").css({"color": "#fff"}); */

	
	
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
	'click #toggle-btn': function(){
		if ($(window).outerWidth() > 1194) {
			$('nav.side-navbar').toggleClass('shrink');
			$('.page').toggleClass('active');
		} else {
			$('nav.side-navbar').toggleClass('show-sm');
			$('.page').toggleClass('active-sm');
		}
	}
});

uiInfo = function(show, action){
	$("#ui-wrapper").removeClass("large-info");
	if(show){
		$("#ui-wrapper").addClass("full-content");
	}else{
		$("#ui-wrapper").removeClass("full-content");

		if(action == "large"){
			$("#ui-wrapper").addClass("large-info");
		}
	}
}


uiSidePanel = function(action){
	if(action == "show"){
		$("#ui-side-panel").addClass("show");
	}else if(action == "hide"){
		$("#ui-side-panel").removeClass("show");
	}
}

$(document).mouseup(function (e) {
	var container = $("#ui-side-panel");

	// if the target of the click isn't the container nor a descendant of the container
	if (container.hasClass("show") && !container.is(e.target) && container.has(e.target).length === 0) {
		$("#ui-side-panel").removeClass("show");
	}
});

