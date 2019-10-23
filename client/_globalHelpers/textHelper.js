Template.registerHelper('truncate', function(text, num) {
    return truncate(text, num, "...");
});