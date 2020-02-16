Template.screen.onRendered(function () {

    let template = Templates.findOne({});
    Session.set("menus", template.menus);



});

Template.screen.helpers({
    'menus': function () {
        return Templates.findOne().menus;
    },
    'editSet': function () {
        let editItem = Session.get("edit-screen-item");
        if (typeof editItem["set_index"] != "undefined" && typeof editItem["item_index"] == "undefined") {
            let dataSet = Templates.findOne().menus[Session.get("selected-menu-index")].data;

            //console.log(dataSet);
            return dataSet[editItem.set_index];
        }

        return null;
    },
    'editItem': function () {
        let editItem = Session.get("edit-screen-item");
        if (typeof editItem["set_index"] != "undefined" && typeof editItem["item_index"] != "undefined") {
            let dataSet = Templates.findOne().menus[Session.get("selected-menu-index")].data;
            return dataSet[editItem.set_index].data[editItem.item_index]
        }

        return null;
    },
    'dataset': function () {
        let dataSet = Session.get("selected-menu");

        if (dataSet && dataSet.data) {
            return dataSet.data;
        } else {
            return [];
        }

    },
    'selected': function (setIndex, itemIndex) {
        let editItem = Session.get("edit-screen-item");
        if (typeof setIndex != undefined && typeof itemIndex == "undefined") {
            if (setIndex == editItem.set_index) {
                return "selected";
            }
        } else if (typeof setIndex != undefined && typeof itemIndex != "undefined") {
            if (setIndex == editItem.set_index && itemIndex == editItem.item_index) {
                return "selected";
            }
        }

        return "";

    },
    'isTwoColumn': function (style) {
        return style == "two-column";
    },
    'menuSelected': function () {
        if(typeof Session.get("selected-menu-index") != "undefined"){
            return true;
        }else{
            return false;
        }


    }
})


Template.screen.events({
    'click .js-content-selected': function (event) {
        let setName = $(event.currentTarget).data("set-name");
        let itemIndex = $(event.currentTarget).data("item-index");

        data = {
            'set_index': setName,
            'item_index': itemIndex
        }

        Session.set("edit-screen-item", data);
    },
    'click .js-section-selected': function (event) {
        let setIndex = $(event.currentTarget).data("set-index");

        let data = {
            'set_index': setIndex,
        };

        console.log(data);
        Session.set("edit-screen-item", data);
    },
    'click .js-menu-select': function (event) {
        let template = Templates.findOne();
        let menuIndex = $(event.currentTarget).data("menu-index");
        Session.set("selected-menu-index", menuIndex);
        Session.set("selected-menu", template.menus[menuIndex]);
        Session.set("edit-screen-item", {});


    },
    'change .js-edit-item': function (event) {
        let template = Templates.findOne();
        let editItem = Session.get("edit-screen-item");
        let key = $(event.target).data("key");

        let dataSet = Session.get("selected-menu").data;

        dataSet[editItem.set_index].data[editItem.item_index][key] = $(event.target).val();


        template.menus[Session.get("selected-menu-index")].data = dataSet;

        Session.set("selected-menu", template.menus[Session.get("selected-menu-index")]);

        Templates.update(template._id, {
            $set: {
                "menus": template.menus
            }
        });
    },
    'change .js-edit-set': function (event) {
        let template = Templates.findOne();
        let setIndex = Session.get("edit-screen-item").set_index;
        let key = $(event.target).data("key");

        let dataSet = Session.get("selected-menu").data;

        dataSet[setIndex][key] = $(event.target).val();

        template.menus[Session.get("selected-menu-index")].data = dataSet;

        Session.set("selected-menu", template.menus[Session.get("selected-menu-index")]);

        Templates.update(template._id, {
            $set: {
                "menus": template.menus
            }
        });
    },
    'click .js-set-two-column': function (event) {
        let template = Templates.findOne();
        let setIndex = Session.get("edit-screen-item").set_index;
        let key = $(event.target).data("key");

        let dataSet = Session.get("selected-menu").data;

        dataSet[setIndex][key] = $(event.target).val();

        template.menus[Session.get("selected-menu-index")].data = dataSet;

        Session.set("selected-menu", template.menus[Session.get("selected-menu-index")]);

        Templates.update(template._id, {
            $set: {
                "menus": template.menus
            }
        });
    },
    'click .js-add-row': function (event) {
        let template = Templates.findOne();
        let editItem = Session.get("edit-screen-item");

        let dataSet = Session.get("selected-menu").data;

        let item = {
            info1: "Novo prato info...",
            info2: "Prato info 2...",
            price: "0,00€",
            icons: "extras..",
        };
        dataSet[editItem.set_index].data.push(item);

        template.menus[Session.get("selected-menu-index")].data = dataSet;

        Session.set("selected-menu", template.menus[Session.get("selected-menu-index")]);

        Templates.update(template._id, {
            $set: {
                "menus": template.menus
            }
        });

    },
    'click .js-remove-row': function (event) {
        let template = Templates.findOne();
        let editItem = Session.get("edit-screen-item");

        let dataSet = Session.get("selected-menu").data;

        delete dataSet[editItem.set_index].data.splice(editItem.item_index, 1);

        //let menu = Session.get("menus");

        template.menus[Session.get("selected-menu-index")].data = dataSet;

        //Session.set("menus", menu);
        Session.set("selected-menu", template.menus[Session.get("selected-menu-index")]);

        Templates.update(template._id, {
            $set: {
                "menus": template.menus
            }
        });
    },
    'click .js-create-menu': function (event) {
        let categoryCount = $("#category-count").val();
        let menuName = $("#menu-name").val();
        let template = Templates.findOne();

        if (categoryCount > 0 && categoryCount < 6 && menuName) {
            let data = [];

            for (let i = 0; i < categoryCount; i++) {
                
                let category = {
                    name: "Categoria" + i,
                    name2: "Categoria" + i,
                    data: []
                };

                data.push(category);

            }

            template.menus.push({ "name": menuName, "data": data });
            //Session.set("menus", menu);

            Templates.update(template._id, {
                $set: {
                    "menus": template.menus
                }
            });
        }

    },
    'click .js-delete-menu': function (event) {
        let template = Templates.findOne();

        let menuIndex = Session.get("selected-menu-index");


        template.menus.splice(menuIndex, 1);

        Templates.update(template._id, {
            $set: {
                "menus": template.menus
            }
        });


        Session.set("selected-menu-index", null);
        Session.set("selected-menu", null);
    }
});
