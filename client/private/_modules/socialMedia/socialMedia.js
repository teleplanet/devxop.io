
postToFb = function (item, page) {
    Session.set("module.processingLoader", true);
    let itemToPost = item;//Session.get("module.selecteditem");

    if (!page) {
        page = Session.get("fb").pages.data[0].id
    }

    if (!page) {
        console.log("no fb page selected!");
        notifyMessage("Please select a facebook page to post to.", "danger");
        Session.set("module.processingLoader", false);
    } else {
        let fbPage = page;
        //let fbPage = Session.get("fb").pages.data[0].id;
        console.log("Fb page: " + fbPage);
        if (itemToPost) {
            console.log("Item to post: " + itemToPost.name);

            FB.api('/me/accounts', async function (response) {
                if (response.error) {
                    console.log(response);
                    Session.set("module.processingLoader", false);
                    notifyMessage("An error occurred trying to post to facebook", "danger");
                } else {
                    console.log(response);
                    let data = response.data[0];

                    console.log(data);

                    var imageData = itemToPost["image_thumb"];

                    var blob = dataURItoBlob(imageData);

                    let formData = new FormData();
                    formData.append('published', true);
                    formData.append('access_token', data.access_token);
                    formData.append('source', blob);
                    /* formData.append('title', itemToPost.name); */
                    formData.append('message', "#" + itemToPost.name + "\n" +
                        "\n" + "**[PT-EN]**" +
                        "\n" + itemToPost["info_pt"] + "\n" +
                        "\n" + itemToPost["info_en"] + "\n" +
                        /* "\n" + "Price: " +  */ "\n" + itemToPost.price + "€");


                    let responseFB = await fetch('https://graph.facebook.com/' + data.id + '/photos', {
                        body: formData,
                        method: 'post'
                    });
                    responseFB = await responseFB.json();



                    if (responseFB.id && responseFB.post_id) {
                        notifyMessage("Post has been created! Check your facebook page.", "success");
                        console.log(responseFB);

                        let data = {
                            "fb_post": responseFB
                        }

                        Meteor.call("items.edit", item._id, data, function (err, res) {
                            if (err) {

                            } else {
                                console.log("fb post data has been saved to item: " + item.name);
                            }
                        });

                    }

                    Session.set("module.processingLoader", false);

                }

            });
        } else {
            Session.set("module.processingLoader", false);
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


Template.moduleSocialMedia.onRendered(function () {
    //initFb();
});

Template.moduleSocialMedia.events({
    'change .js-checked-fb-page': function (event) {
        let fbPage = $(event.target).data("fb-page"); //fb page id

        Session.set("fb-selected-page", fbPage);

    },
    'click .js-fb-logout': function () {
        Session.set("fb", undefined);
        notifyMessage("You have disconnected your facebook account from devxop", "info");
        /*  FB.logout(function(response) {
             // user is now logged out
             console.log(response);
             Session.set("fb", undefined);
             notifyMessage("You have disconnected your facebook account from devxop", "info");
         }); */
    },
    'click .js-social-button': function (event) {
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

        if (!fbPage) {
            console.log("no fb page selected!");
            notifyMessage("Please select a facebook page to post to.", "danger");
        } else {
            console.log("Fb page: " + fbPage);
            if (itemToPost) {
                console.log("Item to post: " + itemToPost.name);

                FB.api('/me/accounts', async function (response) {
                    if (response.error) {
                        console.log(response);
                    } else {
                        console.log(response);
                        let data = response.data[0];

                        console.log(data);

                        var imageData = itemToPost["image_thumb"];

                        var blob = dataURItoBlob(imageData);

                        let formData = new FormData();
                        formData.append('published', true);
                        formData.append('access_token', data.access_token);
                        formData.append('source', blob);
                        /* formData.append('title', itemToPost.name); */
                        formData.append('message', "#" + itemToPost.name + "\n" +
                            "\n" + "**[PT-EN]**" +
                            "\n" + itemToPost["info_pt"] + "\n" +
                            "\n" + itemToPost["info_en"] + "\n" +
                            /* "\n" + "Price: " +  */ "\n" + itemToPost.price + "€");


                        let responseFB = await fetch('https://graph.facebook.com/' + data.id + '/photos', {
                            body: formData,
                            method: 'post'
                        });
                        responseFB = await responseFB.json();



                        if (responseFB.id && responseFB.post_id) {
                            notifyMessage("Post has been created! Check your facebook page.", "success");
                            console.log(responseFB);
                        }
                    }

                });
            } else {

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
    'fb': function () {
        return Session.get("fb");
    },
    'selectedItem': function () {
        let item = Session.get("module.selecteditem");

        if (!item) {
            return "select item first...";
        } else {
            return item.name;
        }
    }
});


$(document).mouseup(function (e) {
    var container2 = $(".social-modal");


    if (!container2.is(e.target) // if the target of the click isn't the container...
        && container2.has(e.target).length === 0) {
        container2.removeClass("social-modal-toggled");
    }
});