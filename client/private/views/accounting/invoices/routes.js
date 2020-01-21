Router.route('/accounting/invoices', {
    name: "accounting.invoices",
    controller: 'PrivateController',
    action: function () {
        let query = this.params.query;

        if(query && query["year"] && query["month"]){
            Session.set("invoice-query", {
                year: query["year"],
                month: query["month"],
                day: query["day"]
            });
        }
        

        Session.set("route", "Accounting / Invoices");
        this.render('invoices');
    },
});
