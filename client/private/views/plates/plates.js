Template.plates.helpers({
    'categoriesList':function(){
        return Categories.find().fetch();
    }
});

Template.plates.events({
    'click #insertPlate':function(){

        var data = {
            'name': $('#insertPlateName').val(),
            'price': $('#insertPlatePrice').val(),
            'kcal': $('#insertPlateCal').val(),
            'info_en': $('#insertPlateInfoEn').val(),
            'info_es': $('#insertPlateInfoEs').val(),
            'info_pt': $('#insertPlateInfoPt').val(),
            'category': Session.get("category_id"),
            'visible': true
        }
        

        Meteor.call("plates.insert", data, function(err, data){
            if(err){
                console.log(err);
            }else{
                console.log(data);
            }
        });

        return;
    },
    'click #removePlate':function(){
        console.log(this);

        Meteor.call("plates.remove", this._id, function(err, data){
            if(err){

            }else{
                console.log(data);
            }
        });

        return;
    },
    'click #selectPlateCategory':function(){
        $('#insertPlateCategory').data('id', this.category); //setter

        Session.set("category_id", this.category);
        $('#insertPlateCategory').val(""+this.name);
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
});