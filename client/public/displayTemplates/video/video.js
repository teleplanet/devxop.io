
Template.displayVideo.helpers({
    'video': function () {

        /* if(!Session.get("module.videoUpload"))
            return;

        return Session.get("module.videoUpload"); */

        return Videos.findOne({ "_id": Session.get("template").video_id });
    },
    'videoUrl': function (url) {
        console.log(url)

        //var url = window.URL.createObjectURL(document.location.origin + url);

        var req = new XMLHttpRequest();
        req.open('GET', document.location.origin + url, true);
        req.responseType = 'blob';

        req.onload = function () {
            // Onload is triggered even on 404
            // so we need to check the status code
            if (this.status === 200) {
                var videoBlob = this.response;
                var vid = URL.createObjectURL(videoBlob); // IE10+
                // Video is now downloaded
                // and we can set it as source on the video element
                //video.src = vid;

                $("#video").attr({
                    "src": vid,
                    "autoplay": "autoplay",        
                })
                //console.log(vid);
            }
        }
        req.onerror = function () {
            // Error
        }

        req.send();
    }
});