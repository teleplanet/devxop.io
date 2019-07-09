document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
	var instances = M.Dropdown.init(elems, {});
	
	console.log(instances);

	
  });

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