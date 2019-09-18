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

Collections = new Meteor.Collection('collections');

DisplayTemplates = new Meteor.Collection('displayTemplates');

/* Videos = new Meteor.Collection("videos");
 */

var baseUrl = "";

if (Meteor.isServer) {
    baseUrl = process.env.PWD;



    console.log(process.env);
}


var videoStore = new FS.Store.FileSystem("videos");

Videos = new FS.Collection("videos", {
    stores: [videoStore]
});


var imageStore = new FS.Store.FileSystem('images');
var thumbsStore = new FS.Store.FileSystem('thumbnails');

Images = new FS.Collection('images', {
    stores: [imageStore]
});

Thumbnails = new FS.Collection('thumbnails', {
    stores: [thumbsStore]
});


Images.allow({
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

Thumbnails.allow({
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