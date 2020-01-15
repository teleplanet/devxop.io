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

Template.invoices.onRendered(function () {

    /* $('#dateInsert').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2010,
        maxYear: parseInt(moment().format('YYYY'), 10)
    }, function (start, end, label) {
        //var years = moment().diff(start, 'years');

        //console.log(moment(start).valueOf());

        //Session.set("insert-revenue-date", moment(start).valueOf());
    }); */
});

Template.invoices.helpers({
    'totals': function () {

        let date = Session.get("invoice-date");

        let invoices = Invoices.find({}, { sort: { stamp: 1 } }).fetch()

        let results = {
            'revenue': 0,
            'items': {},
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
                        let existingItem = results.items[item.ProductDescription] != undefined;

                        if (existingItem) {
                            results.items[item.ProductDescription].quantity = parseInt(results.items[item.ProductDescription].quantity) + parseInt(item.Quantity);
                        } else {
                            results.items[item.ProductDescription] = { "quantity": parseInt(item.Quantity) };
                        }
                    });
                } else {



                    if (invoice.Line["ProductDescription"]) {
                        let existingItem = results.items[invoice.Line.ProductDescription] != undefined;

                        if (existingItem) {
                            results.items[invoice.Line.ProductDescription].quantity = parseInt(results.items[invoice.Line.ProductDescription].quantity) + parseInt(invoice.Line.Quantity);
                        } else {
                            results.items[invoice.Line.ProductDescription] = { "quantity": parseInt(invoice.Line.Quantity) };
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

        console.log(results);


        return results;

    },
    'invoices': function (year, month) {
        return Invoices.find({ "year": "" + year, "month": "" + month }, { sort: { stamp: 1 } }).fetch();
    },
    'year': function () {
        return new Date().getFullYear();
    },
    'months': function (year) {
        let invoices = Invoices.find({ "year": "" + year }).fetch();

        months = [];

        invoices.forEach(function (revenues) {
            if (!months.includes(revenues.month)) {
                months.push(revenues.month);
            }
        });

        //console.log(months);

        return months;
    },
});

Template.invoices.events({
    'change #uploadSaft': function (event) {
        let ev = event.target;

        if (ev.files && ev.files[0]) {

            var reader = new FileReader();

            reader.onload = function (e) {
                var result = e.target.result;

                let dom = parseXml(result);
                //json = xml2json(dom);
                //xml2 = json2xml(eval(json));

                let revenues = {};

                var xmlInvoices = dom.getElementsByTagName("Invoice");
                for (var i = 0; i < xmlInvoices.length; i++) {
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

                        } else {
                            Invoices.insert(data);
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

                    let exists = Revenue.findOne({"month": month, "day": day, "year": year});

                    if(exists){

                    }else{
                        Revenues.insert({
                            "stamp": d.getTime(),
                            "month": month,
                            "year": year,
                            "day": day,
                            "value": revenues[key],
                            "observation": "",
                            "stamp_created": new Date().getTime()
                        });
                    }
                    
                }

                //console.log(revenues);
            };

            reader.readAsText(ev.files[0]);

        }
    }
});