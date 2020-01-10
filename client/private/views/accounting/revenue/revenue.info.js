Template.revenueInfo.onRendered(function () {
    $('#dateInsert').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2010,
        maxYear: parseInt(moment().format('YYYY'), 10)
    }, function (start, end, label) {
        //var years = moment().diff(start, 'years');

        //console.log(moment(start).valueOf());

        Session.set("insert-revenue-date", moment(start).valueOf());
    });

    Session.set("insert-revenue-date", moment().valueOf());
});


function csvJSON(csv) {
    const lines = csv.split('\n')
    const result = []
    const headers = ["date", "value"];

    for (let i = 1; i < lines.length; i++) {
        /* if (!lines[i])
            continue */
        const obj = {}
        const currentline = lines[i].split(',')

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
        }
        result.push(obj)
    }
    return result
}

Template.revenueInfo.events({
    'change #quickAdd': function (event) {
        let ev = event.target;

        if (ev.files && ev.files[0]) {

            var reader = new FileReader();

            reader.onload = function (e) {
                //var result = JSON.parse(e.target.result);

                let result = csvJSON(e.target.result);

                console.log(result);

                result.forEach(function (revenue) {

                    var parts = revenue.date.split('/');
                    //console.log(new Date(parts[2], parts[1], parts[0]));

                    
                    var d = new Date(moment(new Date(parts[2], parts[1] - 1, parts[0])).valueOf());

                    var check = moment(d, 'DD/MM/YYYY');
                    var month = check.format('M');
                    var day = check.format('D');
                    var year = check.format('YYYY');

                    d.setHours(0, 0, 0, 0);

                    /* console.log({
                        "stamp": d.getTime(),
                        "month": month,
                        "year": year,
                        "day": day,
                        "value": revenue.value,
                        "observation": "",
                        "stamp_created": new Date().getTime()
                    }); */
                    Revenues.insert({
                        "stamp": d.getTime(),
                        "month": month,
                        "year": year,
                        "day": day,
                        "value": revenue.value,
                        "observation": "",
                        "stamp_created": new Date().getTime()
                    });

                    window.setTimeout(function () { }, 400);
                });

                /* result.forEach(function(expense){
                    //Revenues.insert(expense);

                    window.setTimeout(function(){}, 400);
                }); */

            };

            reader.readAsText(ev.files[0]);

        }
    },
    'click .js-insert-revenue': function (event, template) {
        event.preventDefault();

        let stamp = Session.get("insert-revenue-date"),
            //moment($("#dateInsert").val()).valueOf(),
            value = $('#valueInsert').val(),
            observation = $('#observationInsert').val();

        if (!stamp) {
            console.log("empty field");
            return;
        }

        var d = new Date(stamp);

        var check = moment(d, 'YYYY/MM/DD');
        var month = check.format('M');
        var day = check.format('D');
        var year = check.format('YYYY');

        d.setHours(0, 0, 0, 0);
        Revenues.insert({
            "stamp": d.getTime(),
            "month": month,
            "year": year,
            "day": day,
            "value": value,
            "observation": observation,
            "stamp_created": new Date().getTime()
        });
    },
});