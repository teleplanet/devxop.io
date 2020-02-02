Template.mediaVideos.onRendered(function () {

});

Template.mediaVideos.helpers({
    'data': function () {
        console.log("data was called..");
        let data = {
            videos: [],
            total: 0,
            storage: 0,
        };

        data.videos = Videos.find().fetch(),
            data.total = data.videos.length,

            data.videos.forEach(function (video) {
                data.storage += video.original.size;
            });

        //data.storage = formatBytes(data.storage);

        console.log(data);

        return data;
    },
    'videoUploading': function(){
        

        return false;
    }
})

Template.mediaVideos.events({
    'click .js-remove-video': function (event) {
        event.preventDefault();

        let id = event.target.id;


        Videos.remove(id);
    },
    'change #video-input': function (event) {
        let fileInput = $(event.target);

        if (!fileInput.val()) return

        var value = fileInput.val().replace(/^.*[\\\/]/, '')
        
        $("#video-input-label").text(value);
    }
});