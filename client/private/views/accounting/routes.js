Router.route('/accounting', {
    name: "accounting",
    controller: 'PrivateController',
    action: function () {
        Session.set("route", "Accounting");
        this.render('accounting');
    },
});


Router.route('/accounting/revenue', {
    name: "accounting.revenue",
    controller: 'PrivateController',
    action: function () {
        Session.set("route", "Accounting / Revenue");
        this.render('revenue');
    },
});


Router.route('/accounting/invoices', {
    name: "accounting.invoices",
    controller: 'PrivateController',
    action: function () {
        Session.set("route", "Accounting / Invoices");
        this.render('invoices');
    },
});

