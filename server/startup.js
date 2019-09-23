Meteor.startup(() => {
    console.log('***');


    /* process.env.MONGO_URL='mongodb://teleplanet.ddns.net:27017/';
     */

    var db_url = process.env.MONGO_URL.split(':');
	
	console.log('*** DB:  ' + db_url[db_url.length -1 ]);
    //create users
    dbFixtures();

    console.log('[SYS] Server started @ '+ moment().utc().toISOString() + '\n***');


    //console.log(Meteor.users.find().fetch());

    /* DisplayTemplates.insert({
        "name" : "specials",
        "display_items" : [ 
            "DXYNhZzmTBWKodBej", 
            "63PAh6SQdixZDJnML", 
            "RtF2YCjn6C3rjk3iS"
        ],
        "visible" : true
    }) */

});