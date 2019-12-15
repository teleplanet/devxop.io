Template.company.onRendered(function () {

    /* add unique id to each list item*/
    /*  $('.sortable-section').find('li').each(function (index, elem) {
 
         $(elem).attr('id', 'sortable-list-item-' + (index));
 
     }); */

    /* initialize jQuery UI sortable */
    /* $('.sortable-list').sortable({
        placeholder: 'sortable-list-item-placeholder',
        cursor: 'move',
        delay: 150,
        cancel: '.not-sortable',
        start: function (e, ui) {
            // creates a temporary attribute on the element with the old index
            $(this).attr('data-previndex', ui.item.index());
        },
        update: function (e, ui) {
            let data = {
                public_collections: []
            };



            $('.sortable-list-item').each(function () {
                data["public_collections"].push($(this).data("col-id"));
            });

            Meteor.call("company.edit", Session.get("company")._id, data, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Public collections index organized.");
                }
            });

            $(this).removeAttr('data-previndex');
        }
    });

    $(".sortable-list").disableSelection();

    $(".selector").sortable("option", "forceHelperSize", true); */

    setTimeout(function () {
        let company = Session.get("company");
        Session.set("module.imageUpload", Images.findOne({ "_id": company.image }).url());
    }, 2000)


});

Template.company.helpers({
    'publicCollections': function () {
        return Company.findOne();
    },
    'companyUsers': function(){
        return CompanyUsers.find().fetch();
    }
});


Template.company.events({
    'click .js-image-upload-event': function () {
        let image = Session.get("module.imageUpload");
        let thumb = Session.get("module.imageUploadThumb");
        let company = Session.get("company");

        let data = {};

        var imageObj = new FS.File(dataURItoBlob(image));
        imageObj['user_id'] = Meteor.userId();
        Images.insert(imageObj, function (err, image) {
            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            if (err) {
                console.log(err);
            } else {
                data['image'] = image._id;
                Images.remove({ "_id": company.image });

                var thumbObj = new FS.File(dataURItoBlob(thumb));
                thumbObj['user_id'] = Meteor.userId();
                Thumbnails.insert(thumbObj, function (err, thumbnail) {
                    // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                    if (err) {
                        console.log(err);
                    } else {
                        data['image_thumb'] = thumbnail._id;
                        Thumbnails.remove({ "_id": company.image_thumb });

                        Meteor.call("company.edit", company._id, data, function (err, data) {
                            if (err) {
                                console.log(err)
                                notifyMessage("Failed image upload", "danger");
                            } else {
                                notifyMessage("Image successfully updated", "success");
                            }
                        });

                    }
                });

            }
        });
    },
    'change .js-company-edit': function (event) {
        let company = Session.get("company");

        let editKey = $(event.target).data("key");
        let val = $(event.target).val();

        let data = {};

        data[editKey] = val;

        Meteor.call("company.edit", company._id, data, function (err, res) {
            if (err) {
                console.log(err);
            } else {

            } publicCollections
        });
    },
    'click .js-remove-public-collection': function () {
        let colId = $(event.target).data('col-id');

        let company = Session.get("company");

        let data = {
            "public_collections": [],
        };


        for (let i = 0; i < company.public_collections.length; i++) {
            if (company.public_collections[i] === colId) {
                //console.log(company.public_collections[i] + " " + colId);
            } else {
                data.public_collections.push(company.public_collections[i]);
            }
        }

        Meteor.call("company.edit", company._id, data, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                //console.log(data);
            }
        });
    },
    'click .js-add-public-collection': function () {
        collectionListModal(function (closed, col) {
            if (closed) {

            } else {
                let company = Session.get("company");

                let data = {
                    "public_collections": company.public_collections,
                };

                if (!data["public_collections"]) {
                    data["public_collections"] = [];
                }

                if (data["public_collections"].includes(col._id)) {

                } else {
                    data["public_collections"].push(col._id);

                    Meteor.call("company.edit", company._id, data, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            //console.log(data);
                        }
                    });
                }


            }
        });
    },
    'click .js-add-company-user': function () {
        Meteor.call("company.user.add", function(){

        });
    },
    'click #btn': function () {
        $('.check-sortability, .sortable-list, .fa-icon').toggleClass('active');

        if ($('.sortable-list').hasClass('active')) {

            $('.sortable-list-item').removeClass('not-sortable');

        } else {

            $('.sortable-list-item').addClass('not-sortable');

        }

    }
});
