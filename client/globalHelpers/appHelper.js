Template.registerHelper('app', function(key) {

    let app = {
        name: "devxop.io",
        year: "2019",
        description: "Restaurante related software services.",
        copyright: "COPYRIGHT © 2019 DIVVY. ALL RIGHTS RESERVED.",
        developer: "Daniel Abrantes",
        company: "Teleplanet LTD"
    };

    return app[key];
 });