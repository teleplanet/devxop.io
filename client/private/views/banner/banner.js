import html2canvas from 'html2canvas';


Template.banner.onRendered(function () {
    Session.set("title", "Menu Light");
    Session.set("subTitle", "Sugestão do Chef de baixa caloria");

    $('#btnSave').click();
});

var timer, delay = 2000;





$(document).ready(function () {
    console.log("ready!");

    $("input[name=file]").change(function () {
        console.log("file Changed");
        if (this.files && this.files[0]) {
            var reader = new FileReader();
    
            reader.onload = function (e) {
                var img = $('<img>').attr('src', e.target.result);
                //$('.upload-image-preview').html(img);
                $('.bubbleImage1').html(img);
            };
    
            let dataURL = reader.readAsDataURL(this.files[0]);

            //var img = Session.get("plate1Img");

            //console.log(img);
            $('#bubbleImage1').css("background-image", 'url(' + dataURL + ')');  
        }
    });

});
Template.banner.events({
    'click #plate1Select':function(){
        Session.set("plate1Info", this);

        $('#plate1InfoInput').val(""+this.name + " " + this.kcal + "kcal");

    },
    'click #plate2Select':function(){
        Session.set("plate2Info", this);

        $('#plate2InfoInput').val(""+this.name + " " + this.kcal + "kcal");

    },
    'change #imageUp':function(event){
        console.log("file Changed");
        let ev = event.target;
        if (ev.files && ev.files[0]) {
            var reader = new FileReader();
    
            reader.onload = function (e) {
                $('#imagePlate1').attr('src', e.target.result).width("100").height("100");

                //$('.upload-image-preview').html(img);
                //$('.bubbleImage1').html(img);
                $('#imageUpInfo').html(ev.files[0].name);
                $('.bubbleImage1').css("background-image", 'url(' + e.target.result + ')'); 

                
            };
    
            let dataURL = reader.readAsDataURL(ev.files[0]);

            //var img = Session.get("plate1Img");

            //console.log(img);
            $('.bubbleImage1').css("background-image", 'url(' + dataURL + ')');  
        }
    }, 
    'change #imageUp2':function(event){
        console.log("file Changed");
        let ev = event.target;
        if (ev.files && ev.files[0]) {
            var reader = new FileReader();
    
            reader.onload = function (e) {
                $('#imagePlate2').attr('src', e.target.result).width("100").height("100");
                //$('.upload-image-preview').html(img);
                //$('.bubbleImage1').html(img);
                $('#imageUp2Info').html(ev.files[0].name);
                $('.bubbleImage2').css("background-image", 'url(' + e.target.result + ')'); 
            };
    
            let dataURL = reader.readAsDataURL(ev.files[0]);

            //var img = Session.get("plate1Img");

            //console.log(img);
            $('.bubbleImage2').css("background-image", 'url(' + dataURL + ')');  
        }
    },
    'click #btnDown': function () {
            let blob = Session.get("image");

            downloadURI(blob, "BannerBistro_" + Date.now());
    },  
    'click #btnSave': function () {
        console.log("Image Update");
        $('#loader').show();
        let ele = document.getElementById("capture");

        //$('#capture').css("transform", "scale(1)");
        $('#capture').css("display", "inherit");
        html2canvas(ele, {
            /* width: 2480,
            height: 3508 */
            scale: 1
        }).then(function (canvas) { 

            var dataURL = canvas.toDataURL("image/png");
            var data = atob(dataURL.substring("data:image/png;base64,".length)),
                asArray = new Uint8Array(data.length);

            for (var i = 0, len = data.length; i < len; ++i) {
                asArray[i] = data.charCodeAt(i);
            }

            var blob = new Blob([asArray.buffer], { type: "image/png" });

            Session.set("image", (window.webkitURL || window.URL).createObjectURL(blob));
            Session.set("imageDataUrl", dataURL);

            $('.mobile-ui-preview ').css("background-image", 'url(' + (window.webkitURL || window.URL).createObjectURL(blob) + ')')
            .css("background-size", 'contain');

            //default scale
            //$('#capture').css("transform", "scale(0.3)");
            $('#capture').css("display", "none");
            $('#loader').hide();
        });
    },
    'keyup #title': function(event) {
        let value = $(event.currentTarget).val();

        Session.set("title", value);
    },
    'keyup #subTitle': function(event) {
        let value = $(event.currentTarget).val();

        Session.set("subTitle", value);
    },
    'keyup #plate1Info': function(event) {
        let value = $(event.currentTarget).val();

        Session.set("plate1Info", value);
    },
    'keyup #plate1InfoCal': function(event) {
        let value = $(event.currentTarget).val();

        Session.set("plate1InfoCal", value);
    },
    'keyup #plate2Info': function(event) {
        let value = $(event.currentTarget).val();

        Session.set("plate2Info", value);
    },
    'keyup #plate2InfoCal': function(event) {
        let value = $(event.currentTarget).val();

        Session.set("plate2InfoCal", value);
    },
    'keyup #totalPrice': function(event) {
        let value = $(event.currentTarget).val();

        Session.set("totalPrice", value);
    },
    'keyup input':function(event){
        /* var _this = $(this);
        clearTimeout(timer);
        timer = setTimeout(function() {
            $('#btnSave').click();
        }, delay ); */
        
    }
})

Template.banner.helpers({
    'platesList':function(){
        return Plates.find().fetch();
    },
    'title': function () {
        return Session.get("title");
    },
    'subTitle': function () {
        return Session.get("subTitle");
    },
    'plate1Info': function () {
        return Session.get("plate1Info").name;
    },
    'plate1InfoCal': function () {
        return Session.get("plate1Info").kcal;
    },
    'plate2Info': function () {
        return Session.get("plate2Info").name;
    },
    'plate2InfoCal': function () {
        return Session.get("plate2Info").kcal;
    },
    'totalCal':function(){
        return parseInt(Session.get("plate1Info").kcal) + parseInt(Session.get("plate2Info").kcal);
    },
    'totalPrice': function(){
        return Session.get("totalPrice");
    }

})

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  }