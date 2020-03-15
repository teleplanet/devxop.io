/* var video, $output;
var scale = 0.25;

initialize = function () {
    $output = $("#output");
    video = $("#video").get(0);
    $("#capture").click(captureImage);

    $("#video").on("loadeddata", function () {
        setTimeout(captureImage, 1000);
        //captureImage();
    });
};

captureImage = function () {
    console.log("capturing image");
    var canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')
        .drawImage(video, 0, 0, canvas.width, canvas.height);

    var img = document.createElement("img");
    img.src = canvas.toDataURL();
    $output.prepend(img);
};

Template.test.onRendered(function () {
    initialize();
}); */