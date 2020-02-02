Meteor.methods({
    'images.insert': function (data) {

        let id = Images.insert(data);

        return id;

    },
    'images.remove.all': function (key) {

        if (key !== Meteor.settings.key) {
            return false;
        } 

        Images.remove({});

        /* let allVideos = Videos.find().fetch();

        allVideos.forEach(function(video){
            Videos.remove(video._id);


        }); */
        

        return true;

    }
})