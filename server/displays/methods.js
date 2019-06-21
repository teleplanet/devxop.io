Meteor.methods({
    'display.templates.edit':function (id, data) {
        console.log(data);
    

        DisplayTemplates.update(id, {
            $set: data,
        });
    },
    'display.templates.insert':function (data) {

        return DisplayTemplates.insert(data);
    },
})