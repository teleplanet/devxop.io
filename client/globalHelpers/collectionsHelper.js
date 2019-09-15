Template.registerHelper('getCollection', function(id, key) {

    return Collections.findOne({"_id": id})[key];
 });
