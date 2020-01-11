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


Router.route('/accounting/expenses', {
    name: "accounting.expenses",
    controller: 'PrivateController',
    action: function () {
        Session.set("route", "Accounting / Expenses");
        this.render('expenses');
    },
});

Router.route('/accounting/suppliers', {
    name: "accounting.suppliers",
    controller: 'PrivateController',
    action: function () {
        Session.set("route", "Accounting / Supliers");
        this.render('suppliers');
    },
});

Router.route('/accounting/costs', {
    name: "accounting.costs",
    controller: 'PrivateController',
    action: function () {
        Session.set("route", "Accounting / Costs");

        uiInfo(true);

        this.render('costs');
    },
    onStop: function() {
        uiInfo(false);
    }
});

Router.route('/accounting/previsions', {
    name: "accounting.previsions",
    controller: 'PrivateController',
    action: function () {
        Session.set("route", "Accounting / Previsions");

        uiInfo(true);

        this.render('previsions');
    },
    onStop: function() {
        uiInfo(false);
    }
});

