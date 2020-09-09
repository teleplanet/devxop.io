getBase64FromImageUrl = async function(url) {
    var img = new Image();

    //img.setAttribute('crossOrigin', 'anonymous');

    img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width =this.width;
        canvas.height =this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        var dataURL = canvas.toDataURL("image/jpg");

        //alert(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));

        return dataURL;
    };

    img.src = url;
}

getDataFromImageUrl = async function(url){}
getDataImage = async function(url){

    let image = await Jimp.read({url: url});
    
    let dataUrl = await  image.getBase64Async("image/jpeg");

    return dataUrl;

}

getBase64Image = function(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

dataURItoBlob = function (dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], { type: mimeString });
    return blob;

}

resizeImage = async function(data, width, height){
    /* Jimp.read({
        url: data, // Required!
    }).then(image => {
        // Do stuff with the image.
        image.scaleToFit(width, height);
        image.getBase64Async("image/jpeg").then(dataUrl => {
            return dataUrl;
        });
    }).catch(err => {
        // Handle an exception.
    }); */

    let image = await Jimp.read({url: data});
        // Do stuff with the image.
    image.scaleToFit(width, height);
    
    let dataUrl = await  image.getBase64Async("image/jpeg");

    return dataUrl;

}

// The function that scales an images with canvas then runs a callback.
scaleImage = function (url, width, height, callback) {
    var img = new Image(),
        width = width,
        height = height,
        callback;

    // When the images is loaded, resize it in canvas.
    img.onload = function () {
        var canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;

        // get the scale
        var scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        // get the top left position of the image
        var x = (canvas.width / 2) - (img.width / 2) * scale;
        var y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        // Run the callback on what to do with the canvas element.
        callback(canvas);
    };

    img.src = url;
}

videoUrl = function(id){
    let img = Videos.findOne({"_id": id});


    let url = "";
    if(img){
        url = img.url();
    }

    return  document.location.origin + url +'?'+new Date().getTime();
}


fileUrl = function(id, key){
    let file = Files.findOne({"_id": id});

    let data = {
        url: origins().files + Meteor.userId() + "/" + id
    }

    if(file.is_image){
        data["type"] = "image";
        data["preload"] = data.url + "/preload.jpeg";
        data["thumb"] = data.url + "/thumb.jpeg";
        data["main"] = data.url + "/main.jpeg";
    }else if(file.is_video){
        data["type"] = "video";
        data["preload"] = data.url + "/preload.jpeg";
        data["thumb"] = data.url + "/thumb.jpeg";
        data["preview"] = data.url + "/preview.gif";
        data["video"] = data.url + "/video." + file.extension;
    }

    //console.log(data);

    if(key){
        return data[key];
    }

    return  data;
}


thumbUrl = function(id){
    let thumb = Thumbnails.findOne({"_id": id});
    
    let url = "";
    if(thumb){
        url = thumb.url();
    }

    return document.location.origin + url +'?'+new Date().getTime();
}