RegisterTokens = new Mongo.Collection('registerToken');

Files = new Mongo.Collection('files');

Devices = new Mongo.Collection('devices');
Devices.allow({
    insert: function (userId, doc) {

        doc["user_id"] = userId;

        return true;
    },
    remove: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    },
    update: function (userId, doc) {

        if (doc["user_id"] == userId) {

            return true;
        }
        return false;
    }
})

DeviceSchedules = new Mongo.Collection('deviceSchedules');
DeviceSchedules.allow({
    insert: function (userId, doc) {

        doc["user_id"] = userId;

        return true;
    },
    remove: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    },
    update: function (userId, doc) {

        if (doc["user_id"] == userId) {

            return true;
        }
        return false;
    }
})


MultiscreenSchedule = new Mongo.Collection('multiscreenSchedule');
MultiscreenSchedule.allow({
    insert: function (userId, doc) {

        doc["user_id"] = userId;

        let exists = MultiscreenSchedule.findOne({ "user_id": userId });
        if (exists) {
            return false;
        }

        return true;
    },
    remove: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    },
    update: function (userId, doc) {

        if (doc["user_id"] == userId) {

            return true;
        }
        return false;
    }
})

TemplatesImageText = new Mongo.Collection('templatesImageText');
TemplatesImageText.allow({
    insert: function (userId, doc) {

        doc["user_id"] = userId;

        let exists = TemplatesImageText.findOne({ "user_id": userId });
        if (exists) { 
            return false;
        }

        return true;
    },
    remove: function (userId, doc) {

        if (doc["user_id"] == userId) {
            //find an associated device

            return true;
        }

        return false;
    },
    update: function (userId, doc) {
        if (doc["user_id"] == userId) {
            


            return true;
        }
        return false;
    }
})

Templates = new Mongo.Collection('templates');
Templates.allow({
    insert: function (userId, doc) {

        doc["user_id"] = userId;

        /* let exists = Templates.findOne({ "user_id": userId });
        if (exists) { 
            return false;
        } */

        return true;
    },
    remove: function (userId, doc) {

        if (doc["user_id"] == userId) {
            //find an associated device

            return true;
        }

        return false;
    },
    update: function (userId, doc) {

        if (doc["user_id"] == userId) {
            let device = Devices.findOne({ "display_types.template.id": doc._id });
            if (device) {
                Devices.update(device._id, {
                    $set: {
                        "update": true,
                        "display_types.template.image": doc.image
                    }
                });
            }

            return true;
        }
        return false;
    }
})

TemplateStyles = new Mongo.Collection('templateStyles');
TemplateStyles.allow({
    insert: function (userId, doc) {

        doc["user_id"] = userId;

        let exists = TemplateStyles.findOne({ "user_id": userId });
        if (exists) {
            return false;
        }

        return true;
    },
    remove: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    },
    update: function (userId, doc) {

        if (doc["user_id"] == userId) {

            return true;
        }
        return false;
    }
})


DeviceAccess = new Mongo.Collection('deviceAccess');

Debug = new Meteor.Collection('debug');

Heartbeats = new Meteor.Collection('heartbeats');

LatestLocations = new Meteor.Collection('latestLocations');
LocationHistory = new Meteor.Collection('locationHistory');

Message = new Meteor.Collection('message');

Plans = new Meteor.Collection('plans');
PlanSubscriptions = new Meteor.Collection('planSubscriptions');
PlanSubscriptionsArchive = new Meteor.Collection('planSubscriptionsArchive');

StripeSessions = new Meteor.Collection('stripeSessions');
StripeSessionsArchive = new Meteor.Collection('stripeSessionsArchive');

Revenues = new Meteor.Collection("revenues");

Revenues.allow({
    insert: function (userId, doc) {

        let dateExists = Revenues.findOne({ "stamp": doc.stamp });


        if (dateExists) {
            return false;
        }

        doc["user_id"] = userId;

        return true;
    },
    remove: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    }
})

Costs = new Meteor.Collection("costs");

Costs.allow({
    insert: function (userId, doc) {

        doc["user_id"] = userId;

        return true;
    },
    remove: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    },
    update: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    }
})

Invoices = new Meteor.Collection("invoices");

Invoices.allow({
    insert: function (userId, doc) {

        doc["user_id"] = userId;

        return true;
    },
    remove: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    },
    update: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    }
})


Suppliers = new Meteor.Collection("suppliers");

Suppliers.allow({
    insert: function (userId, doc) {

        doc["user_id"] = userId;

        return true;
    },
    remove: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    },
    update: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    }
})


Expenses = new Meteor.Collection("expenses");

Expenses.allow({
    insert: function (userId, doc) {

        doc["user_id"] = userId;

        return true;
    },
    remove: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    },
    update: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    }
})


PushNotifications = new Meteor.Collection('pushNotifications');

if (Meteor.isServer) {
    PushNotifications._ensureIndex({ "created": 1 }, { expireAfterSeconds: 25 * 60 });
}

PushNotifications.allow({
    insert: function (userId, doc) {
        // the user must be logged in, and the document must be owned by the user
        return true;
    },
    update: function (userId, doc, fields, modifier) {
        // can only change your own documents
        return true;
    },
    remove: function (userId, doc) {
        // can only remove your own documents
        return true;
    }
});

Pagers = new Meteor.Collection('pagers');

Pagers.allow({
    insert: function (userId, doc) {
        // the user must be logged in, and the document must be owned by the user
        return true;
    },
    update: function (userId, doc, fields, modifier) {
        // can only change your own documents
        return true;
    },
    remove: function (userId, doc) {
        // can only remove your own documents
        return true;
    }
});

var backupsStore = new FS.Store.FileSystem('backups')
Backups = new FS.Collection('backups', {
    stores: [backupsStore]
});

Backups.allow({
    'insert': function (userId, doc) {
        // add custom authentication code here
        doc["user_id"] = userId;

        return true;
    },
    'update': function () {
        // add custom authentication code here
        return true;
    },
    'remove': function () {
        return true;
    },
    'download': function () {
        return true;
    }
});

Companies = new Meteor.Collection('companies');
Companies.allow({
    update: function (userId, doc) {

        let user = Meteor.users.findOne(userId);
        if (user) {
            if (user.profile.company == doc._id) {
                return true;
            }
        }

        return false;
    }
})
CompanyUsers = new Meteor.Collection("companyUsers");

Events = new Meteor.Collection('events');

PagerSubscriptions = new Meteor.Collection('pagerSubscriptions');

Plates = new Meteor.Collection('plates');


Items = new Meteor.Collection('items');


Categories = new Meteor.Collection('categories');

Collections = new Meteor.Collection('collections');

DisplayTemplates = new Meteor.Collection('displayTemplates');

/* Videos = new Meteor.Collection("videos");
 */



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
    /* transformWrite: function (fileObj, readStream, writeStream) {
        gm(readStream, fileObj.name).autoOrient().stream().pipe(writeStream);
    }, */
    insert: function (userId, doc) {

        //doc.chunkSum vs chunkCount = calculate upload progress
        //console.log( ((doc.chunkCount / doc.chunkSum) * 100) );
        Images.update(doc._id, {
            $set: {
                "progress": ((doc.chunkCount / doc.chunkSum) * 100)
            }
        });
        doc["user_id"] = userId;

        return true;
    },
    remove: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    },
    update: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    },
    download: function () {
        return true;
    }
});

Thumbnails.allow({
    insert: function (userId, doc) {

        doc["user_id"] = userId;

        return true;
    },
    remove: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    },
    update: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    },
    'download': function () {
        return true;
    }
});


Videos.allow({
    insert: function (userId, doc) {
        //doc.chunkSum vs chunkCount = calculate upload progress
        //console.log( ((doc.chunkCount / doc.chunkSum) * 100) );
        Videos.update(doc._id, {
            $set: {
                "progress": ((doc.chunkCount / doc.chunkSum) * 100)
            }
        });
        doc["user_id"] = userId;

        return true;
    },
    remove: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    },
    update: function (userId, doc) {

        if (doc["user_id"] == userId) {
            return true;
        }

        return false;
    },
    download: function () {

        return true;
    }
});