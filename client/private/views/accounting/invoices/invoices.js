function parseTextAsXml(text) {
    var parser = new DOMParser(),
        xmlDom = parser.parseFromString(text, "text/xml");

    //now, extract items from xmlDom and assign to appropriate text input fields
}

function parseXml(xml) {
    var dom = null;
    if (window.DOMParser) {
        try {
            dom = (new DOMParser()).parseFromString(xml, "text/xml");
        }
        catch (e) { dom = null; }
    }
    else if (window.ActiveXObject) {
        try {
            dom = new ActiveXObject('Microsoft.XMLDOM');
            dom.async = false;
            if (!dom.loadXML(xml)) // parse error ..

                window.alert(dom.parseError.reason + dom.parseError.srcText);
        }
        catch (e) { dom = null; }
    }
    else
        alert("cannot parse xml string!");
    return dom;
}

Template.invoices.onCreated(function () {
    Deps.autorun(function () {

        let query = Session.get("invoice-query");

        if (!query) {
            let now = moment(new Date(), "DD/MM/YYYY");
            let month = now.format('M');
            let year = now.format("YYYY");

            let invoicesSub = Meteor.subscribe("invoices", { "month": month, "year": year });
        } else {
            let invoicesSub = Meteor.subscribe("invoices", query);
        }



    });
});

Template.invoices.onRendered(function () {

    $('#invoiceDate').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2010,
        maxYear: parseInt(moment().format('YYYY'), 10)
    }, function (start, end, label) {
        let now = moment(new Date(start), "DD/MM/YYYY");
        let month = now.format('M');
        let year = now.format("YYYY");
        let day = now.format("D");

        Session.set("invoice-query", {"year": year, "month": month, "day": day});

    });

    Session.set("saft-upload", {
        "started": false,
        "percent": 0,
        "invoices_added": 0,
        "invoices_skipped": 0,
        "revenues_added": 0,
        "revenues_skipped": 0,
        "ended": false,
    });
});

Template.invoices.helpers({
    'saftUpload': function () {
        return Session.get("saft-upload");
    },
    'totals': function () {
        let invoices = Invoices.find({}, { sort: { stamp: 1 } }).fetch()

        let results = {
            'revenue': 0,
            'items': {},
            'best_sellers': [],
            'peak_hours': {},
        }


        invoices.forEach(function (invoice) {

            //calculate peak sales
            let time = invoice.DocumentStatus.InvoiceStatusDate;
            let hour = new Date(time).getHours();

            if (results.peak_hours[hour]) {
                results.peak_hours[hour] = results.peak_hours[hour] + 1
            } else {
                results.peak_hours[hour] = 1
            }



            //calculate best seller
            if (invoice["Line"]) {

                //console.log(invoice.Line);

                if (Array.isArray(invoice.Line)) {
                    invoice.Line.forEach(function (item) {
                        item.ProductDescription = item.ProductDescription.replace(/[^a-zA-Z ]/g, "");
                        let existingItem = results.items[item.ProductDescription] != undefined;

                        if (existingItem) {
                            results.items[item.ProductDescription].quantity += parseInt(item.Quantity);
                            results.items[item.ProductDescription].net += parseFloat(item.CreditAmount);
                        } else {
                            results.items[item.ProductDescription] = { "quantity": parseInt(item.Quantity), "net": parseFloat(item.CreditAmount), "tax": parseInt(item.Tax.TaxPercentage) };
                        }
                    });
                } else {



                    if (invoice.Line["ProductDescription"]) {
                        invoice.Line.ProductDescription = invoice.Line.ProductDescription.replace(/[^a-zA-Z ]/g, "");
                        let existingItem = results.items[invoice.Line.ProductDescription] != undefined;

                        if (existingItem) {
                            results.items[invoice.Line.ProductDescription].quantity += parseInt(invoice.Line.Quantity);
                            results.items[invoice.Line.ProductDescription].net += parseFloat(invoice.Line.CreditAmount);
                        } else {
                            results.items[invoice.Line.ProductDescription] = { "quantity": parseInt(invoice.Line.Quantity), "net": parseFloat(invoice.Line.CreditAmount), "tax": parseInt(invoice.Line.Tax.TaxPercentage) };
                        }
                    } else {
                        //console.log(invoice);
                    }

                }


            }


            //calculate total Revenue
            if (invoice["DocumentTotals"]) {

                results.revenue = results.revenue + parseInt(invoice.DocumentTotals.GrossTotal);
            } else {
                console.log("no document totals")
            }

        });

        //console.log(results);

        // Get an array of the keys:
        let keys = Object.keys(results.items);

        // Then sort by using the keys to lookup the values in the original object:
        keys.sort(function (a, b) { return results.items[b].quantity - results.items[a].quantity });

        //console.log(keys);

        results.best_sellers = keys;

        return results;

    },
    'invoices': function () {
        return Invoices.find({}, { sort: { stamp: -1 } }).fetch();
    },
    'topItems': function (results) {
        let top10 = [];

        results.best_sellers.forEach(function (key, i) {
            /*  if(i <= 20){
                 results.items[key]["name"] = key;
                 top10.push(results.items[key]); 
             } */
            results.items[key]["name"] = key;
            top10.push(results.items[key]);

        });

        //console.log(top10);

        return top10;
    }
});

Template.invoices.events({
    'change #uploadSaft': function (event) {

        let progress = Session.get("saft-upload");
        progress["started"] = true;
        Session.set("saft-upload", progress);

        let ev = event.target;

        if (ev.files && ev.files[0]) {

            var reader = new FileReader();

            reader.onload = function (e) {
                var result = e.target.result;

                let dom = parseXml(result);

                /* parser = new DOMParser();
                let dom = parser.parseFromString(result, "text/xml"); */

                //json = xml2json(dom);
                //xml2 = json2xml(eval(json));

                let revenues = {};

                var xmlInvoices = dom.getElementsByTagName("Invoice");
                for (var i = 0; i < xmlInvoices.length; i++) {
                    progress["percent"] = (100 / xmlInvoices.length) * i;
                    Session.set("saft-upload", progress);

                    let xmlInvoice = xmlInvoices[i];

                    let invoice = xml2json(xmlInvoice, "");

                    let data = JSON.parse(invoice).Invoice;

                    var parts = data.InvoiceDate.split('-');

                    var d = new Date(moment(new Date(parts[0], parts[1] - 1, parts[2])).valueOf());

                    var check = moment(d, 'DD/MM/YYYY');
                    var month = check.format('M');
                    var day = check.format('D');
                    var year = check.format('YYYY');

                    data["stamp"] = d.getTime();
                    data["day"] = day;
                    data["month"] = month;
                    data["year"] = year;

                    if (data) {
                        let exists = Invoices.findOne({ "InvoiceNo": data.InvoiceNo });

                        if (exists) {
                            progress["invoices_skipped"] += 1;
                            Session.set("saft-upload", progress);
                        } else {
                            Invoices.insert(data);

                            progress["invoices_added"] += 1;
                            Session.set("saft-upload", progress);
                        }

                    }

                    d.setHours(0, 0, 0, 0);

                    if (revenues[d.getTime()]) {
                        revenues[d.getTime()] = revenues[d.getTime()] + parseInt(data.DocumentTotals.GrossTotal);
                    } else {
                        revenues[d.getTime()] = parseInt(data.DocumentTotals.GrossTotal);
                    }

                }

                for (var key in revenues) {

                    var d = new Date(parseInt(key));

                    var check = moment(d, 'YYYY/MM/DD');
                    var month = check.format('M');
                    var day = check.format('D');
                    var year = check.format('YYYY');

                    d.setHours(0, 0, 0, 0);

                    let exists = Revenues.findOne({ "month": month, "day": day, "year": year });

                    if (exists) {
                        progress["revenues_skipped"] += 1;
                        Session.set("saft-upload", progress);
                    } else {
                        Revenues.insert({
                            "stamp": d.getTime(),
                            "month": month,
                            "year": year,
                            "day": day,
                            "value": revenues[key],
                            "observation": "",
                            "stamp_created": new Date().getTime()
                        });

                        progress["revenues_added"] += 1;
                        Session.set("saft-upload", progress);
                    }

                }

                //console.log(revenues);

                progress["ended"] = true;
                progress["started"] = false;
                Session.set("saft-upload", progress);

                console.log(progress);
            };

            reader.readAsText(ev.files[0]);

        }
    }
});