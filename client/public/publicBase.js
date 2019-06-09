Template.publicBase.events({
	'click .js-menu-layout-overlay':function(event, template){
		$('.list-vertical').removeClass('list-vertical-toggled');
		$('.layout-test').removeClass('layout-test-toggled');
		$('.layout-menu-overlay').removeClass('layout-menu-overlay-toggled');

		/* animationInterval(function () { // <-- this will run once all the above animations are finished
		    // your callback (things to do after all animations are done)
		    $('#showcase').removeClass('stars-hidden');
		}); */
	},
	'click .js-menu':function(event, template){
		//console.log(event);
		$('#showcase').addClass('stars-hidden');
		$('.layout-test').toggleClass('layout-test-toggled');
		$('.layout-menu-overlay').toggleClass('layout-menu-overlay-toggled');
		$('.list-vertical').toggleClass('list-vertical-toggled');

	},
	'click .js-menu-list-item':function(event, template){
		$('.list-vertical').removeClass('list-vertical-toggled');
		$('.layout-test').removeClass('layout-test-toggled');
		$('.layout-menu-overlay').removeClass('layout-menu-overlay-toggled');
		$('#showcase').removeClass('stars-hidden');
	}
});

function animationInterval (callback) {

    var testAnimationInterval = setInterval(function () {
        if (! $.timers.length) { // any page animations finished
            clearInterval(testAnimationInterval);
            callback();
        }
    }, 400);
};