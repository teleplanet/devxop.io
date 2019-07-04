Template.registerHelper('app', function(key) {

    let app = {
        name: "devxop.com",
        year: "2019",
        description: "Restaurante related software services.",
        copyright: "COPYRIGHT © 2019 Daniel Abrantes. ALL RIGHTS RESERVED.",
        developer: "Daniel Abrantes",
        company: "Daniel Abrantes"
    };

    return app[key];
 });