var timer;
var delay = 2000; // 0.6 seconds delay after last input


Template.items.onRendered(function () {
    let items = Items.find().fetch();
    Session.set("items", items);
});

Template.items.helpers({
    'listItems': function () {
        return Session.get("items");
    },
    'listCategories': function () {
        return [];
    },
    'categoriesList':function(){
        return Categories.find().fetch();
    },
    'getCategory':function(catId, key){
        let cat = Categories.findOne({"category": parseInt(catId)});
        
        if(cat){
            return cat[key];
        }else{
            return "";
        }
    }
});

Template.items.events({
    'click .js-items-card-select': () => {
        let itemId = $(".js-items-card-select").data('item-id');

        Router.go("/item/edit/" + itemId);
    },
    'click .btn-collapse': function (event) {
        let index = $(event.target).val();

        $('.collapse').collapse('hide');
        $('#collapse' + index).collapse('toggle');
    },
    'change .plateEdit': function (event) {
        let value = $(event.target).val();
        let key = $(event.target).data('key');
        let id = $(event.target).data('id');

        console.log(value);
        let data = {};
        data[key] = value;

        isCheckbox = $(event.target).is(':checkbox');
        if(isCheckbox){
            if ( $(event.target).is(":checked") ){
                data["visible"] = true;
            }else{
                data["visible"] = false;
            }
        }else{
            console.log("not checkbox");
        }
    

        Meteor.call("items.edit", id, data, function(err,data){
            if(err)
                console.log(err);

            console.log("item updated");
        });
        
    },
    'click #selectPlateCategory':function(){
        $('#insertPlateCategory').val(""+this.category); //setter
    },
    'change #imageUp':function(event){
        console.log("file Changed");

        let id = $(event.target).data('id');
        let ev = event.target;
        if (ev.files && ev.files[0]) {
            
            let data = {};
            
            
            var fileReader = new FileReader();
            fileReader.onload = function(event) {
                //console.log(event.target.result);
                data['image'] = event.target.result;


                Meteor.call("items.edit", id, data, function(err,data){
                    if(err)
                        console.log(err);
        
                    console.log("item updated");
                });
            };
            fileReader.readAsDataURL(ev.files[0]);
        
        }
    },
});