
import ImageCompressor from 'image-compressor.js';


function rotate(p_deg) {
    if (document.getElementById('canvas')) {
		/*
		Ok!: Firefox 2, Safari 3, Opera 9.5b2
		No: Opera 9.27
		*/
        var image = document.getElementById('image');
        var canvas = document.getElementById('canvas');
        var canvasContext = canvas.getContext('2d');

        switch (p_deg) {
            default:
            case 0:
                canvas.setAttribute('width', image.width);
                canvas.setAttribute('height', image.height);
                canvasContext.rotate(p_deg * Math.PI / 180);
                canvasContext.drawImage(image, 0, 0);
                break;
            case 90:
                canvas.setAttribute('width', image.height);
                canvas.setAttribute('height', image.width);
                canvasContext.rotate(p_deg * Math.PI / 180);
                canvasContext.drawImage(image, 0, -image.height);
                break;
            case 180:
                canvas.setAttribute('width', image.width);
                canvas.setAttribute('height', image.height);
                canvasContext.rotate(p_deg * Math.PI / 180);
                canvasContext.drawImage(image, -image.width, -image.height);
                break;
            case 270:
            case -90:
                canvas.setAttribute('width', image.height);
                canvas.setAttribute('height', image.width);
                canvasContext.rotate(p_deg * Math.PI / 180);
                canvasContext.drawImage(image, -image.width, 0);
                break;
        };

    } else {
		/*
		Ok!: MSIE 6 et 7
		*/
        var image = document.getElementById('image');
        switch (p_deg) {
            default:
            case 0:
                image.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=0)';
                break;
            case 90:
                image.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=1)';
                break;
            case 180:
                image.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=2)';
                break;
            case 270:
            case -90:
                image.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=3)';
                break;
        };

    };
};

function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

function addCss(rule) {
    let css = document.createElement('style');
    css.type = 'text/css';
    if (css.styleSheet) css.styleSheet.cssText = rule; // Support for IE
    else css.appendChild(document.createTextNode(rule)); // Support for the rest
    document.getElementsByTagName("head")[0].appendChild(css);
}


Template.templateEdit.onRendered(function () {
    var controller = Iron.controller();
    controller.render('templateEditInfo', { to: 'nav-panel-info' });

    //console.log(str);
    /* var sheet = document.createElement('style')
    sheet.innerHTML = str;
    document.body.appendChild(sheet); */

    $("#template-edit-iframe").attr("src", "/templates/" + Session.get("template-edit")._id + "/preview");

    /* let template = Session.get("template-edit");
    let testData = [{"name":"Vegetariano","name2":"Vegetarian","data":[{"info1":"Hambúrger de abóbora assada com quinoa, especiarias e batata doce acompanhado de espargos, ananás, frutos secos e mistura de alfaces","info2":"Baked pumpkin, quinoa and sweet potato burger w/ spices, served w/ asparagus, pineapple, tree nuts and mix lettuces","price":"9,90€","icons":{"organic":{"selected":true,"value":"organic"},"vegan":{"selected":true,"value":"vegan"},"gluten":{"selected":true,"value":"gluten"}}},{"info1":"Risotto de espinafres e gengibre com amêndoas torradas","info2":"Spinach and ginger risotto with toasted almonds","price":"9,90€","icons":{"new":{"selected":true,"value":"new"}}},{"info1":"Strogonoff de legumes com ervas frescas, tomate assado, amêndoa torrada e cebola crocante acompanha arroz branco","info2":"vegetable strogonoff with fresh herbs, roasted tomatoes, toasted almonds and crunchy onions with white rice","price":"9,90€","icons":{"gluten":{"selected":true,"value":"gluten"},"organic":{"selected":true,"value":"organic"}}},{"info1":"Hambúrger de feijão com soja, nozes, cogumelos, molho de manga e gengibre em bolo levedo c/ batata doce assada","info2":"Bean burger w/ soy nuts and mushrooms, mango and ginger sauce in Azores cake served w/ roasted sweet potato","price":"9,90€","icons":{"vegan":{"selected":true,"value":"vegan"},"organic":{"selected":true,"value":"organic"}}},{"info1":"Risotto de cogumelos e espargos com tomate cereja","info2":"Mushrooms and asparagus risotto with cherry tomatoes\nMushrooms and asparagus risotto with cherry tomatoes","price":"9,90€","icons":{"organic":{"selected":true,"value":"organic"},"vegan":{"selected":false,"value":"vegan"},"gluten":{"selected":false,"value":"gluten"},"new":{"selected":false,"value":"new"}}}],"style":""},{"name":"Bebidas","name2":"Drinks","data":[{"info1":"Sumo do dia","info2":"Juice of the day","price":"2,50€","icons":""},{"info1":"Reserva da casa tinto (copo)","info2":"Reserve red wine glass","price":"3,50€","icons":"","style":""},{"info1":"Refrigerantes 30cl","info2":"Cola, Fanta, Nestea, Sprite","price":"1,50€","icons":""},{"info1":"Vinho tinto da casa (copo)","info2":"Red wine glass","price":"2,00€","icons":"extras.."},{"info1":"Água 33cl","info2":"Still Water","price":"1,00€","icons":""},{"info1":"Vinho Branco da casa (copo)","info2":"White Wine glass","price":"2,00€","icons":""},{"info1":"Água com gás 1/4","info2":"Sparkling Water","price":"1,40€","icons":"extras.."},{"info1":"Vinho Rosé da casa (copo)","info2":"Rosé wine glass","price":"2,00€","icons":"extras.."},{"info1":"Imperial Sagres 30cl","info2":"Sagres Beer","price":"1,40€","icons":"extras..","style":""},{"info1":"Garrafas disponíveis para venda, preço sob consulta","info2":"Bottles available for sale, price on request","price":"","icons":"extras..","style":"info"},{"info1":"Cerveja Sagres 50cl","info2":"Sagres Beer","price":"2,50€","icons":"extras.."},{"info1":"Café Expresso","info2":"Coffee","price":"0,90€","icons":"extras..","style":""},{"info1":"Cerveja BOHEMIA 30cl","info2":"Bohemia Beer","price":"1,90€","icons":"extras.."},{"info1":"Descafeinado","info2":"Decaffeinated","price":"0,90€","icons":"extras.."},{"info1":"Cerveja sem Álcool 33cl","info2":"Non-Alcohol Beer","price":"1,60€","icons":"extras.."}],"style":"two-column"}];
    Templates.update(template._id, {
        $set: {
            "data": testData
        }
    }); */

    //$("#template-iframe").attr("src", "/templates/" + Session.get("template-edit")._id + "/preview");

    $("#template-edit-iframe").on("load", function () {
        let style = TemplateStyles.findOne();
        let str = style.data;

        var sheet = document.createElement('style');
        sheet.innerHTML = str;

        let head = $("#template-edit-iframe").contents().find("head");
        console.log("template loaded");
        console.log("injecting custom css");
        $(head).append(sheet);

    });
});

Template.templateEdit.events({
    'click .js-generate-template': function (event) {
        $(event.currentTarget).hide();
        let rotation = $(event.currentTarget).data("rotation");
        let template = Session.get("template-edit");

        Templates.update(template._id, {
            $set: {
                "editing": {}
            }
        });

        $("#template-edit-iframe").contents().find('.content-item.selected').removeClass("selected");

        //$(".content-item.selected").removeClass("selected");


        // You can then get the data URL when the image got loaded:
        let width = "1080";
        let height = "1920";

        let elem = $("#template-edit-iframe").contents().find('#template')[0];
        $("#template-edit-iframe").css({ "width": width + "px", "height": height + "px" });

        /* if(typeof rotation != "undefined"){
            if(rotation == "90"){
                $(elem).addClass("rotate90");
            }else if(rotation == "-90"){
                $(elem).addClass("rotate90");
                $(elem).addClass("anticlock");
            }
        } */


        /* $("#template-edit-iframe").css({ "right": "-100%", "position": "absolute" }); */
        document.html2canvas(elem, { "width": width, "height": height, "userCORS": true }).then(canvas => {

            let img = document.getElementById("image");
            let canvasImage = document.getElementById("canvas");

            $(img).on('load', function () {

                if (typeof rotation != "undefined") {
                    if (rotation == "90") {
                        rotate(90);
                    } else if (rotation == "-90") {
                        rotate(-90);
                    } else if (rotation == "0") {
                        rotate(0);
                    }
                }


                //img.width = 1920;
                //img.height = 1080;
                //img.src = canvasImage.toDataURL("image/jpeg");

                var blob = dataURItoBlob(canvasImage.toDataURL("image/jpeg"));

                new ImageCompressor(blob, {
                    quality: 1,
                    width: width,
                    height: height,
                    success(result) {
                        var imageObj = new FS.File(result);
                        imageObj['user_id'] = Meteor.userId();
                        imageObj['template_id'] = template._id;

                        //check existense
                        let exists = Images.findOne({ "user_id": Meteor.userId(), "template_id": template._id });
                        if (exists) {
                            Images.remove(exists._id);
                        }

                        Images.insert(imageObj, function (err, image) {
                            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                            if (err) {
                                console.log(err);
                            } else {
                                scaleImage(canvasImage.toDataURL("image/jpeg"), 720, 480, function (canvas) {
                                    var blob = dataURItoBlob(canvas.toDataURL("image/jpeg"));
                                    new ImageCompressor(blob, {
                                        quality: 1,
                                        width: 720,
                                        height: 480,
                                        success(result) {

                                            var thumbObj = new FS.File(result);
                                            thumbObj['user_id'] = Meteor.userId();
                                            thumbObj['template_id'] = template._id;
                                            Thumbnails.insert(thumbObj, function (err, thumbnail) {
                                                // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                                                if (err) {
                                                    console.log(err);
                                                } else {

                                                    Templates.update(template._id, {
                                                        $set: {
                                                            "image": imageObj._id,
                                                            "image_thumb": thumbObj._id
                                                        }
                                                    });


                                                    let devices = Devices.find({ "display_types.template.id": template._id }).fetch();
                                                    if (devices) {
                                                        for (let i = 0; i < devices.length; i++) {
                                                            let device = devices[i];
                                                            //console.log("Device updating..." + device._id);
                                                            Devices.update(device._id, {
                                                                $set: {
                                                                    "update": true
                                                                }
                                                            });
                                                        }

                                                    }

                                                    $(event.currentTarget).show();

                                                    Router.go("/templates");
                                                }
                                            });

                                        },
                                        error(e) {
                                            console.log(e.message);
                                        },
                                    });
                                });

                            }
                        });



                    },
                    error(e) {
                        console.log(e.message);
                    },
                });



            });

            img.src = canvas.toDataURL("image/jpeg");
            $("#template-edit-iframe").css({ "width": "480px", "height": "720px" });
        });


        /* $(elem).removeClass("rotate90");
        $(elem).removeClass("anticlock");
        /*                                 $("#template-edit-iframe").css({ "right": "initial", "position": "initial" }); */
        /* $("#template-edit-iframe").css({ "width": "480px", "height": "720px" }); */



    },
})

Template.templatePreview.helpers({
    'template': function () {
        return Session.get("template-edit");
    },
    'editCategory': function () {
        let editIndex = Session.get("template-edit-index");

        if (!editIndex) return;

        if (editIndex.category_edit) {
            return Session.get("template-edit").data[editIndex.category_index];
        }
    },
    'editItem': function () {

    },
    'selected': function (categoryIndex, itemIndex) {
        let editIndex = Session.get("template-edit-index");

        if (!editIndex) return;

        if (typeof categoryIndex != undefined && typeof itemIndex == "undefined") {
            if (categoryIndex == editIndex.category_index) {
                return "selected";
            }
        } else if (typeof setIndex != undefined && typeof itemIndex != "undefined") {
            if (categoryIndex == editIndex.category_index && itemIndex == editIndex.item_index) {
                return "selected";
            }
        }
        return "";
    },
    'icon': function (catIndex, itemIndex, key) {
        let template = Session.get("template-edit");

        let extra = template.data[catIndex].data[itemIndex].icons[key];

        if (extra) {
            if (key == "new" && extra.selected) {
                return extra.value;
            } else {
                return extra.selected;
            }

        } else {
            return false;
        }
    }
});

Template.templatePreview.events({
    'click .js-category-select': function (event) {
        let template = Session.get("template-edit");
        let categoryIndex = $(event.currentTarget).data("category-index");

        let data = {
            'category_index': categoryIndex,
            'category_edit': true,
            'item_index': null,
            'item_edit': false
        }

        Templates.update(template._id, {
            $set: {
                "editing": data
            }
        })

        Session.set("template-edit-index", data);
    },
    'click .js-item-select': function (event) {
        let template = Session.get("template-edit");
        let categoryIndex = $(event.currentTarget).data("category-index");
        let itemIndex = $(event.currentTarget).data("item-index");

        let data = {
            'category_index': categoryIndex,
            'category_edit': false,
            'item_index': itemIndex,
            'item_edit': true,
        }

        Templates.update(template._id, {
            $set: {
                "editing": data
            }
        })

        Session.set("template-edit-index", data);
    }

});