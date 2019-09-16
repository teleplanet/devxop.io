MenuCollections = new Mongo.Collection('menuCollections', { connection: null });

Template.publicCompany.onRendered(function () {

    this.sessionWatcher = Session.watch('publicCompany', function (value) {
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
                    }


                }
            });
        }
    });
});


Template.publicCompany.helpers({
    'collections': function () {


        return Session.get("publicCollections");
    },
    'company': function () {

        return Session.get("publicCompany");
    }
});