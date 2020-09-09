Template.mediaSocial.onRendered(function(){
    var controller = Iron.controller();
        controller.render('socialInfo', { to: 'nav-panel-info' });
});


testPost = async function(){
    FB.api('/me/accounts', async function (response) {
        if (response.error) {
            console.log(response);
            notifyMessage("An error occurred trying to post to facebook", "danger");
        } else {
            console.log(response);
            let data = response.data[0];

            console.log(data);

            //var imageData = itemToPost["image_thumb"];
            let base64 = await getDataFromImageUrl("http://localhost:3000/cfs/files/images/J4XFkuh6XcTgfwonM");
            var blob = dataURItoBlob(base64);

            let formData = new FormData();
            formData.append('published', true);
            formData.append('access_token', data.access_token);
            formData.append('source', blob);
            formData.append('title', "test name");
            formData.append('message', "Test Message");


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
}