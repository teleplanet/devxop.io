Template.auth_layout.helpers({
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

Template.auth_layout.events({
	'click .js-menu-layout-overlay':function(event, template){
		$('.list-vertical').removeClass('list-vertical-toggled');
		$('.layout-test').removeClass('layout-test-toggled');
		$('.layout-menu-overlay').removeClass('layout-menu-overlay-toggled');

		animationInterval(function () { // <-- this will run once all the above animations are finished
		    // your callback (things to do after all animations are done)
		    $('#showcase').removeClass('stars-hidden');
		});
	},
	'click .js-menu-list-item':function(event, template){
		$('.list-vertical').removeClass('list-vertical-toggled');
		$('.layout-test').removeClass('layout-test-toggled');
		$('.layout-menu-overlay').removeClass('layout-menu-overlay-toggled');
		$('#showcase').removeClass('stars-hidden');
    }
});