import html2canvas from 'html2canvas';

Template.menu.onRendered(function(){
    let categories = Categories.find().fetch();
    let plates = Plates.find({}, {sort:{name: 1}}).fetch();
    let data = {};

    //console.log(categories);
    for(let i = 0; i < categories.length; i++){
        data["cat"+i] = categories[i];
    }

    Session.set("categories", data);
    Session.set("plates", plates);
    Session.set("language", "pt");
});

Template.menu.helpers({
    'hasData':function(){
        let cat = Session.get("categories");
        let plate = Session.get("plates");

        if(cat && plate){
            return true;
        }else{
            return false;
        }
    },
    'categories':function(){
        let data = Session.get("categories");
        let lang = Session.get("language");


        for (var cat in data) {
            if(lang == "pt" ){
                data[cat]["name"] = data[cat]["name"];
            }else if(lang == "en" ){
                data[cat]["name"] = data[cat]["name_en"];
            }else if(lang == "es" ){
                data[cat]["name"] = data[cat]["name_es"];
            }else{
    
            }
        }

        return data;
    },
    'platesList':function(cat_id){
        //console.log(cat_id);
        let data = Items.find({}).fetch();
        let lang = Session.get("language");


        let platesArray = [];

        for(var i = 0; i < data.length; i++){
            /* console.log(data[i]); */
            if(data[i].visible && data[i].category == cat_id){

                let obj = {
                    "name": data[i]["name"],
                    "price": data[i]["price"],
                    "kcal":data[i]["kcal"]
                };

                if(lang == "pt" ){
                    obj['info'] = data[i]["info_pt"];
                }else if(lang == "en" ){
                    obj['info'] = data[i]["info_en"];
                }else if(lang == "es" ){
                    obj['info'] = data[i]["info_es"];
                }
                    
                platesArray.push(obj);
            }else{
                //do nothing
            }
        }

        return platesArray;
    }
});

Template.menu.events({
    'click #btnSave': function () {
        console.log("Image Update");
        
        let ele = document.getElementById("capture");

        $("#capture").css('transform', 'inherit');

        //$('#capture').css("transform", "scale(1)");
        //$('#capture').css("display", "inherit");
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

            /* $('.mobile-ui-preview ').css("background-image", 'url(' + (window.webkitURL || window.URL).createObjectURL(blob) + ')')
            .css("background-size", 'contain'); */

            //default scale
            //$('#capture').css("transform", "scale(0.3)");
           /*  $('#capture').css("display", "none");
            $('#loader').hide(); */

            $('#capture').css("transform", "scale(0.3)");
        });
    },
    'click #btnDown': function () {
        let blob = Session.get("image");

        downloadURI(blob, "BannerBistro_" + Date.now());
},  
    'click #selectLangEn':function(event){
        Session.set("language", "en");
    },
    'click #selectLangPt':function(event){
        Session.set("language", "pt");
    },
    'click #selectLangEs':function(event){
        Session.set("language", "es");
    }
});


function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  }