/* var image; */
Template.editItem.onRendered(function () {

    let item = Session.get("item-edit");
    let category = Categories.findOne({ "_id": item.category });

    //image = item.image;
    Session.set("module.selectedCategory", category);
    Session.set("module.imageUpload", thumbUrl(item["image_thumb"]) );

    /* //image upload change tracker
    this.sessionWatcher = Session.watch('module.imageUpload', function (value) {
        if (Session.get("module.imageUpload") != image) {
            let id = Session.get("item-edit")["_id"];
            let data = {};
            data['image'] = Session.get("module.imageUpload");
    
            Meteor.call("items.edit", id, data, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    image = Session.get("module.imageUpload");
                }
    
            });
        }
    }); */

    let fbPostStats = Session.get("fb-post-stats");
    let fbPost = Session.get("item-edit").fb_post;
    if (fbPost && !fbPostStats) {
        FB.api(
            "/" + fbPost.post_id + "?fields=shares,comments.limit(3).summary(true),likes.limit(0).summary(true)",
            function (response) {
                if (response && !response.error) {
                    /* handle the result */
                    console.log(response);

                    Session.set("fb-post-stats", response);
                }
            }
        );
    }

    //$('.tabs').tabs();
});


Template.editItem.helpers({
    'item': function () {
        return Session.get("item-edit");
    },
    'fbConnected': function () {
        return Session.get("fb");
    },
    'fbPost': function () {
        let fbPost = Session.get("item-edit").fb_post;
        let fbPostStats = Session.get("fb-post-stats");

        if (fbPost) {
            //?fields=shares,comments.limit(3).summary(true),likes.limit(0).summary(true)
            console.log("fb post exists");
            if (!fbPostStats) {
                console.log("no fb stats on post");

                FB.api(
                    "/" + fbPost.post_id + "?fields=shares,comments.limit(3).summary(true),likes.limit(0).summary(true)",
                    function (response) {
                        if (response && !response.error) {
                            /* handle the result */
                            console.log(response);

                            Meteor.call("items.edit", Session.get("item-edit")._id, { "fb_post.data": response })

                            Session.set("fb-post-stats", response);
                        } else {
                            Session.set("fb-post-stats", fbPost.data);
                        }
                    }
                );
            } else {
                return Session.get("fb-post-stats");
            }

        } else {
            return false;
        }
    }
});

Template.editItem.events({
    'click .js-post-item': function () {
        //fb post item, pageId(optional) params;

        postToFb(Session.get("item-edit"));
    },
    'click .js-image-upload-event': function (event) {
        //console.log(event);
        let image = Session.get("module.imageUpload");
        let thumb = Session.get("module.imageUploadThumb");
        let item = Session.get("item-edit");

        let data = {};

        var imageObj = new FS.File(dataURItoBlob(image));
        imageObj['user_id'] = Meteor.userId();
        Images.insert(imageObj, function (err, image) {
            // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
            if (err) {
                console.log(err);
            } else {
                data['image'] = image._id;
                Images.remove({"_id": item.image});

                var thumbObj = new FS.File(dataURItoBlob(thumb));
                thumbObj['user_id'] = Meteor.userId();
                Thumbnails.insert(thumbObj, function (err, thumbnail) {
                    // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                    if (err) {
                        console.log(err);
                    } else {
                        data['image_thumb'] = thumbnail._id;
                        Thumbnails.remove({"_id": item.image_thumb});

                        Meteor.call("items.edit", item._id, data, function (err, data) {
                            if (err) {
                                console.log(err)
                                notifyMessage("Failed item update", "danger");
                            } else {
                                notifyMessage("Item successfully updated", "success");
                            }
                        });

                    }
                });

            }
        });


    },
    'click .js-category-selected': function (event) {
        let key = "category";
        let value = Session.get("module.selectedCategory")["_id"];
        let id = Session.get("item-edit")["_id"];

        let data = {};
        data[key] = value;

        Meteor.call("items.edit", id, data, function (err, data) {
            if (err) {
                console.log(err)
                notifyMessage("Failed item update", "danger");
            } else {
                notifyMessage("Item successfully updated", "success");
            }
        });
    },
    'change .plateEdit': function (event) {
        let value = $(event.target).val();
        let key = $(event.target).data('key');
        let id = Session.get("item-edit")["_id"];

        let data = {};
        data[key] = value;

        isCheckbox = $(event.target).is(':checkbox');
        if (isCheckbox) {
            if ($(event.target).is(":checked")) {
                data[key] = true;
            } else {
                data[key] = false;
            }
        } else {
            console.log("not checkbox");
        }


        Meteor.call("items.edit", id, data, function (err, data) {
            if (err) {
                console.log(err)
                notifyMessage("Failed item update", "danger");
            } else {
                notifyMessage("Item successfully updated", "success");
            }
        });

    },
    'click .js-item-remove': function () {
        let id = Session.get("item-edit")["_id"];

        confirmPopup({ title: "Delete Item", msg: "Your are attempting to permanantly delete and item. Are you sure?", btn_type: "danger", btn_msg: "Delete(danger)" }, function (canceled, confirmed) {
            if (canceled) {
                console.log("item deletion canceled.");
            } else if (confirmed) {
                Meteor.call("items.remove", id, function (err, data) {
                    if (err) {
                        console.log(err)
                        notifyMessage("Failed item update", "danger");
                    } else {
                        notifyMessage("Item has been removed", "success");
                        Router.go("/");
                    }

                });
            }
        })
    }
});
