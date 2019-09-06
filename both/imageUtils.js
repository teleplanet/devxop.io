dataURItoBlob = function(dataURI) {
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
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  
  }

  // The function that scales an images with canvas then runs a callback.
scaleImage = function(url, width, height, callback) {
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

        // draw the img into canvas
        ctx.drawImage(this, 0, 0, width, height);

        // Run the callback on what to do with the canvas element.
        callback(canvas);
    };

    img.src = url;
}