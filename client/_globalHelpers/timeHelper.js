

Template.registerHelper('getDate', function(timestamp) {
    return moment(timestamp).format('DD/MM/YYYY');
});