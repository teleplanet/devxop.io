Meteor.startup(() => {
    console.log('***');
    
    //create users
    dbFixtures();

    console.log('[SYS] Server started @ '+ moment().utc().toISOString() + '\n***');

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