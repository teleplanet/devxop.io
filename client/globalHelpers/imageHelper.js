Template.registerHelper("getUrlFromBlob", function (blob) {
    console.log(blob);
	return URL.createObjectURL(blob);
});

Template.registerHelper("imageUrl", function (id) {
    return imageUrl(id);
});

imageUrl = function(id){
    let img = Images.findOne({"_id": id});


    let url = "";
    if(img){
        url = img.url();
    }

    return  document.location.origin + url +'?'+new Date().getTime();
}

Template.registerHelper("thumbUrl", function (id) {

    return thumbUrl(id);
});

thumbUrl = function(id){
    let thumb = Thumbnails.findOne({"_id": id});
    
    let url = "";
    if(thumb){
        url = thumb.url();
    }

    return document.location.origin + url +'?'+new Date().getTime();
}

//**dataURL to blob**
dataURLtoBlob = function(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

//**blob to dataURL**
blobToDataURL = function(blob, callback) {
    var a = new FileReader();
    a.onload = function(e) {callback(e.target.result);}
    a.readAsDataURL(blob);
}