


Template.moduleSocialMedia.onRendered(function(){
    initFb();
});

Template.moduleSocialMedia.events({
    'change .js-checked-fb-page': function(event){
        let fbPage = $(event.target).data("fb-page"); //fb page id

        Session.set("fb-selected-page", fbPage);

    },
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


        let fbPage = Session.get("fb-selected-page");
        let itemToPost = Session.get("module.selecteditem");

        if(!fbPage){
            console.log("no fb page selected!");
        }else{
            console.log("Fb page: " + fbPage);
            if(itemToPost){
                console.log("Item to post: " + itemToPost.name);

                FB.api('/me/accounts', async function (response) {
                    if (response.error) {
                        console.log(response);
                    } else {
                        console.log(response);
                        let data = response.data[0];
        
                        var imageData = itemToPost["image_thumb"];
        
                        var blob = dataURItoBlob(imageData);
        
                        let formData = new FormData();
                        formData.append('access_token', data.access_token);
                        formData.append('source', blob);
                        formData.append('message', itemToPost["info_en"]);
        
                        let responseFB = await fetch('https://graph.facebook.com/' + data.id + '/photos', {
                            body: formData,
                            method: 'post'
                        });
                        responseFB = await responseFB.json();
        
                        console.log(responseFB);
                    }
        
                });
            }else{

            }
        }
        /* FB.api('/me/accounts', async function (response) {
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

        }); */
    }
});


Template.moduleSocialMedia.helpers({
    'fb': function(){
        return Session.get("fb");
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