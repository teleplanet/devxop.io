Meteor.methods({
    'categories.insert': function (name, name_fr, name_es, name_pt) {

        let id = Categories.insert({
            'name': name,
            'name_fr': name_fr,
            'name_es': name_es,
            'name_pt': name_pt
        });

        return true;

    },
    'categories.remove': function (catId) {
        let id = Categories.remove({
            '_id': catId,
        });

        return true;

    }
})