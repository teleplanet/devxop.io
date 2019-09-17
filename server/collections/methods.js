Meteor.methods({
    'collections.edit': function (id, data) {
        //console.log(data);
        
        data["user_id"] = this.userId;

        Collections.update(id, {
            $set: data,
        });
    },
    'collections.insert': function (data) {

        data["user_id"] = this.userId;

        let id = Collections.insert(data);

        return true;

    },
    'collections.remove': function (itemId) {

        let id = Collections.remove({
            '_id': itemId,
            'user_id': this.userId
        });

        return true;

    },
    'collections.docs': function (query) {
        //console.log(data);
        let final = [];
        let collections = Collections.find(query).fetch();
        

        for (let i = 0; i < collections.length;  i++) {
            let col = collections[i];
    
            /* col["collection_id"] = col._id;

            delete col._id; */
            
            let query = {
                "_id": {
                    "$in": col.items
                }
            };

            let items = Items.find(query, {fields: {image:0}}).fetch();
    
            col["items"] = items;
            col["timestamp"] = new Date().getTime();


            final.push(col);

        }


        return final;
        
    },
})