Template.company.onRendered(function () {
    /* add unique id to each list item*/
    $('.sortable-section').find('li').each(function (index, elem) {

        $(elem).attr('id', 'sortable-list-item-' + (index));

    });

    /* initialize jQuery UI sortable */
    $('.sortable-list').sortable({
        placeholder: 'sortable-list-item-placeholder',
        cursor: 'move',
        delay: 150,
        cancel: '.not-sortable',
        start: function (e, ui) {
            // creates a temporary attribute on the element with the old index
            $(this).attr('data-previndex', ui.item.index());
        },
        update: function (e, ui) {
            // gets the new and old index then removes the temporary attribute
            /* var newIndex = ui.item.index();
            var oldIndex = $(this).attr('data-previndex');
            var element_id = ui.item.attr('id');
            console.log('id of Item moved: ');
            console.log(element_id+' old position = '+oldIndex+' new position = '+newIndex); */

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

    $(".selector").sortable("option", "forceHelperSize", true);

});

Template.company.helpers({
    'publicCollections': function () {
        return Company.findOne();
    },
});


Template.company.events({
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

            }
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
    'click #btn': function () {
        $('.check-sortability, .sortable-list, .fa-icon').toggleClass('active');

        if ($('.sortable-list').hasClass('active')) {

            $('.sortable-list-item').removeClass('not-sortable');

        } else {

            $('.sortable-list-item').addClass('not-sortable');

        }

    }
});
