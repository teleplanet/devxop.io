stripe = null;

Meteor.startup(() => {
    console.log('***');


    /* process.env.MONGO_URL='mongodb://teleplanet.ddns.net:27017/';
     */


    if (Meteor.isProduction) {
        stripe = require('stripe')(Meteor.settings.stripe.live.sk);
    } else {
        stripe = require('stripe')(Meteor.settings.stripe.test.sk);
    }

    //console.log(stripeSk);
    //setup global stripe var
    

    var db_url = process.env.MONGO_URL.split(':');

    console.log('*** DB:  ' + db_url[db_url.length - 1]);
    //create users
    dbFixtures();

    console.log('[SYS] Server started @ ' + moment().utc().toISOString() + '\n***');


    //SETUP CRON JOBS
    Meteor.call("plans.cron.setup");
    Meteor.call("devices.cron");

});