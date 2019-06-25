
 Template.registerHelper('user', function(key) {
    return Session.get("user").profile;
 });