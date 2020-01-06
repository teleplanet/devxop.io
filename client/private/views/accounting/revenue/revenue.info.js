Template.revenueInfo.onRendered(function(){
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

Template.revenueInfo.events({
    'click .js-insert-revenue': function (event, template) {
        event.preventDefault();

        let stamp = Session.get("insert-revenue-date"),
            //moment($("#dateInsert").val()).valueOf(),
            value = $('#valueInsert').val();

        if(!stamp){
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
            "stamp_created": new Date().getTime()
        });
    },
});