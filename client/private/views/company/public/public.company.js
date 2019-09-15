MenuCollections = new Mongo.Collection('menuCollections', {connection: null});

Template.publicCompany.onRendered(function () {

    this.sessionWatcher = Session.watch('publicCompany', function(value) {
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
                    for (let col of collections) {
    
                        col["collection_id"] = col._id;
    
                        delete col._id;
                        
                        let query = {
                            "_id": {
                                "$in": col.items
                            }
                        };
                
                        Meteor.call("items.docs", query, function (err, items) {
                            if (err) {
                                console.log(err);
                            } else {
                                col["items"] = items;
                                col["timestamp"] = new Date().getTime();
    
    
                                MenuCollections.insert(col);
                                
                            }
                        });
    
                    }
    
                    
                
                }
            });
        }
    });
});


Template.publicCompany.helpers({
    'collections': function () {    
        let company = Session.get("publicCompany");
        let menu = MenuCollections.find().fetch();
        let final = [];
        
        
        if(company && menu){
            let menuCol = company.public_collections;
            for(let i = 0; i < menuCol.length; i++){
                let col = MenuCollections.findOne({"collection_id": menuCol[i]});
                //console.log(col);
                if(col){
                    final.push(col);
                }
            }
            //console.log(final);
        }

        return final;
    },
    'company': function () {

        return Session.get("publicCompany");
    }
});