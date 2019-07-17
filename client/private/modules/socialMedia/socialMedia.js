


/* Template.moduleSocialMedia.onRendered(function(){
    Session.set("module.selectedCategory", null);
}); */

Template.moduleSocialMedia.events({
    'click .js-social-button':function(event){
        event.preventDefault();
        $('.social-modal').toggleClass('social-modal-toggled');

    },
    'click .js-login-fb': function () {
        FB.login(function (response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');

                let fb = {};

                FB.api('/me', function (response) {
                    console.log(response);
                    console.log('Good to see you, ' + response.name + '.');
                    fb["user"] = response;

                    FB.api('/me/accounts', function (response) {
                        fb["pages"] = response;

                        Session.set("fb", fb);
                    });
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, { perms: 'publish_pages,instagram_basic' });
    },
    'click .js-create-post': function () {

        FB.api('/me/accounts', async function (response) {
            if (response.error) {
                console.log(response);
            } else {
                let data = response.data[0];

                var imageData = Items.findOne().image_thumb;

                var blob = dataURItoBlob(imageData);

                let formData = new FormData();
                formData.append('access_token', data.access_token);
                formData.append('source', blob);
                formData.append('message', "this is a test on price");

                let responseFB = await fetch('https://graph.facebook.com/' + data.id + '/photos', {
                    body: formData,
                    method: 'post'
                });
                responseFB = await responseFB.json();

                console.log(responseFB);
            }

        });
    }
});


Template.moduleSocialMedia.helpers({
    'fb': function(){
        return Session.get("facebook");
    }
});


$(document).mouseup(function(e)
{
     var container2 = $(".social-modal");


    if(!container2.is(e.target) // if the target of the click isn't the container...
        && container2.has(e.target).length === 0)
    {
    	container2.removeClass("social-modal-toggled");
    }
});