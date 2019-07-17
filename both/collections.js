RegisterTokens = new Mongo.Collection('registerToken');

Devices = new Mongo.Collection('devices');

Debug = new Meteor.Collection('debug');

LatestLocations = new Meteor.Collection('latestLocations');

LocationHistory = new Meteor.Collection('locationHistory');


Companies = new Meteor.Collection('companies');

Events = new Meteor.Collection('events');

PagerSubscriptions = new Meteor.Collection('pagerSubscriptions');

Plates = new Meteor.Collection('plates');


Items = new Meteor.Collection('items');


Categories = new Meteor.Collection('categories');

DisplayTemplates = new Meteor.Collection('displayTemplates');

/* Videos = new Meteor.Collection("videos");
 */



Videos = new FS.Collection("videos", {
    stores: [new FS.Store.FileSystem("videos", { path: "~/uploads" })]
});



Videos.allow({
    'insert': function () {
        // add custom authentication code here
        return true;
    },
    'update': function () {
        // add custom authentication code here
        return true;
    },
    'remove': function() {
        return true;
    },
    'download': function() {
        return true;
    }
});