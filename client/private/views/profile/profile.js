const dataURItoBlob = (dataURI) => {
    let byteString = atob(dataURI.split(',')[1]);
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {
        type: 'image/jpeg'
    });
}


Template.profile.helpers({

});


/* function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
} */

Template.profile.events({
    'click .js-login-fb': function () {
        FB.login(function (response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function (response) {
                    console.log(response);
                    console.log('Good to see you, ' + response.name + '.');
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