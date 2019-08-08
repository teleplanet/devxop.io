
Template.displayVideo.onRendered(function () {
    console.log('onRendered');

    Session.set("video-download", true);

    //Session.set("module.processingLoader", true);

});



Template.displayVideo.helpers({
    'download': function () {
        return Session.get("video-download");
    },
    'video': function () {

        /* if(!Session.get("module.videoUpload"))
            return;

        return Session.get("module.videoUpload"); */

        return Videos.findOne({ "_id": Session.get("template").video_id });
    },
    'videoUrl': function (url) {
        /* Session.set("video-download", true); */

        if (!$("#video").attr('src')) {
            console.log("no source");

            var req = new XMLHttpRequest();
            req.open('GET', document.location.origin + url, true);
            req.responseType = 'blob';
            req.onprogress = updateProgress;
            req.onload = function () {
                // Onload is triggered even on 404
                // so we need to check the status code
                if (this.status === 200) {
                    var videoBlob = this.response;
                    var vid = URL.createObjectURL(videoBlob); // IE10+

                    $("#video").attr('src', vid);

                    /* $("#video").attr({
                        "src": vid,
                        "autoplay": "autoplay",
                        "muted": "muted",
 
                    }); */
                    //console.log(vid);

                    Session.set("module.processingLoader", false);
                    Session.set("video-download", false);
                }
            }
            req.onerror = function () {
                // Error
                Session.set("video-download", false);
            }

            req.send();
        } else {
            console.log("contains source!");
        }





        //var url = window.URL.createObjectURL(document.location.origin + url);

        /* $("#video").attr({
            "src": url,
            "autoplay": "autoplay",
        }); */


    }
});

function updateProgress(evt) {
    if (evt.lengthComputable) {  // evt.loaded the bytes the browser received
        // evt.total the total bytes set by the header
        // jQuery UI progress bar to show the progress on screen
        var percentComplete = (evt.loaded / evt.total) * 100;
        //$('#progressbar').progressbar( "option", "value", percentComplete );
        /* console.log("video progress: " + percentComplete); */

        $('.js-download-progress').css("width", percentComplete + "%");
    }
}   