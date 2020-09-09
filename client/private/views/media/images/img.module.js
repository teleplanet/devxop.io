Template.img.onRendered(function () {
    /* 
        This function helps load page quickly using a preload method to display images consecutavly.
        From low quality to higher...
    */
    let file = this.data.file;
    let fileUrls = fileUrl(file._id);
    let error = false;
    let loadAttempts = 1;

    //get second node of template
    //use this object reference so that jquery does not find multiple elemnts -> prevents conflict
    let elm = $(this.lastNode);

    elm.on("error", function () {
        error = true;
        if (loadAttempts <= 3) {
            setTimeout(() => {
                loadAttempts++;
                this.src = this.src;
            }, 1000);
        } else {
            console.log("no more attemps to load image...");
        }


    });

    elm.on("load", function () {
        //here preload has been succesfully shown and so we now move on to higher quality thumb

        if (file.is_video) {
            //set gif
            elm.attr("src", fileUrls.preview);
        } else {
            //set new src this time with thumb 
            elm.attr("src", fileUrls.thumb);
        }
        //unbind event listened so that it does not conflict with other or use memory.
        //also prevents double load.
        elm.unbind('load');

    });

    //load preload image and then follow to onLoad event above
    elm.attr("src", fileUrls.preload);
});