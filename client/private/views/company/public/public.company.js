MenuCollections = new Mongo.Collection('menuCollections', { connection: null });

Template.publicCompany.onRendered(function () {

    /* $("#body").css("overflow-y", "auto"); */

    /* this.sessionWatcher = Session.watch('publicCompany', function (value) {
        Session.set("module.processingLoader", true);
        let company = Session.get("publicCompany");

        if (company && company.public_collections) {
            let query = {
                "_id": {
                    "$in": company.public_collections
                }
            };

            Meteor.call("collections.docs", query, function (err, collections) {
                if (err) {
                    return [];
                } else {

                    console.log(collections);

                    let company = Session.get("publicCompany");
                    let final = [];

                    //here we want to order collections acording to what user has organised
                    if (company && collections) {
                        let order = company.public_collections;

                        for (let i = 0; i < order.length; i++) {

                            for (let z = 0; z < collections.length; z++) {
                                if (collections[z]._id == order[i]) {
                                    final.push(collections[z]);
                                    //break;
                                }
                            }
                        }

                        Session.set("publicCollections", final);
                        Session.set("module.processingLoader");
                    }


                }
            });
        }
    }); */
});


Template.publicCompany.helpers({
    'getThumb':function(){
        return thumbUrl(Session.get("publicCompany").image_thumb);
    },
    'collections': function () {


        return Session.get("publicCollections");
    },
    'company': function () {

        return Session.get("publicCompany");
    },
    'selectedItem': function(){
        return Session.get("publicSelectedItem");
    },
    'readyPagers': function(){

        let ready = Pagers.find({"state": 3}).fetch();

        if(ready.length > 0)
            $("div").animate({ scrollTop: 0 }, "slow");

        return ready;
    },
    'preparingPagers': function(){
        return Pagers.find({"state": 2}).fetch();
    },
    'getStateDescription': function(state){
        if(state == 1){
            return "Pager is not in use.";
        }else if(state == 2){
            return "Your food is currently being prepared. May take up to 15min.";
        }else if(state == 3){
            return "Your food is ready! Please go get it!"
        }else{
            return "";
        }
    }
});

Template.publicCompany.events({
    'click .js-company-item': function(event){
        let itemId = $(event.currentTarget).data("item-id"); 

        let collections = Session.get("publicCollections");
        for (let z = 0; z < collections.length; z++) {
            let items = collections[z].items;
            //console.log(items);
            for(let i = 0; i < items.length; i++){
                //console.log(items[i]);
                //console.log(itemId);
                if(items[i]._id == itemId){
                    //console.log(items[i]);
                    Session.set("publicSelectedItem", items[i]);
                }
            }
        }

        $(".company-item-modal").toggleClass("company-item-modal-toggled");
        $("#body").css("overflow-y", "hidden");
    }
});

$(document).mouseup(function (e) {
    var container2 = $(".company-item-modal");


    if (!container2.is(e.target) // if the target of the click isn't the container...
        && container2.has(e.target).length === 0) {
        container2.removeClass("company-item-modal-toggled");
       /*  $("#body").css("overflow-y", "auto"); */
    }
});