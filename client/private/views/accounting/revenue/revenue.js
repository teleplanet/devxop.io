var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

var yearLocation;

Template.revenue.onRendered(function () {
    var controller = Iron.controller();
    controller.render('revenueInfo', { to: 'nav-panel-info' });

    let obj = Revenues.find({}, { fields: { _id: 0, user_id: 0 } }).fetch();

    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

    $('<a class="button" href="data:' + data + '" download="revenueBackup.json">Backup</a>').appendTo('#revenueBackup');

    /* $(".ui-content").on("scroll", function(e){
        let top = e.currentTarget.scrollTop;
        //console.log(top);

        $('.divider').each(function () {
            var post = $(this);
            var position = post.position().top - top;
            
            if (position <= 0) {
                //post.addClass('selected');
                console.log(post.data("year"));
            } else {
                //post.removeClass('selected');
            }
        });
        
    }); */

});


Template.revenue.helpers({
    'format':function(amount, point){

        if(!amount){
            return "";
        }

        amount = parseInt(amount);

        if(point == "neg"){
            return "-" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "€";
        }else if(point == "pos"){
            return "+" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "€";
        }

        return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + "€";

        
    },
    'calendarData': function(month, year){
        let revenues = Revenues.find({ "year": "" + year, "month": "" + month }, { sort: { stamp: 1 } }).fetch();
    

        let day = new Date(revenues[0].stamp).getDay();

        let skip = [];
        for(let i = 0; i < day; i++){
            skip.push({"day": "", "value": ""});
        }


        

        return skip.concat(revenues);


    },
    'dailyRevenue': function () {
        return Revenues.find({}, { sort: { stamp: -1 } }).fetch();
    },
    'getMonth': function (monthNum) {
        return month[monthNum - 1];
    },
    'years': function () {
        let latestYear = Revenues.findOne({}, { sort: { year: -1 }, fields: { year: 1 } }).year;
        let oldestYear = Revenues.findOne({}, { sort: { year: 1 }, fields: { year: 1 } }).year;

        let seriesNum = (parseInt(latestYear) - parseInt(oldestYear)) + 1;

        let years = [];

        for (let i = 0; i < seriesNum; i++) {
            years.push(latestYear - i);
        }

        yearLocation = years;

        return years;
    },
    'months': function (year) {
        let revenues = Revenues.find({ "year": "" + year }).fetch();

        months = [];

        revenues.forEach(function (revenues) {
            if (!months.includes(revenues.month)) {
                months.push(revenues.month);
            }
        });

        //console.log(months);

        return months;
    },
    'revenues': function (year, month) {
        return Revenues.find({ "year": "" + year, "month": "" + month }, { sort: { stamp: 1 } }).fetch();
    },
});


Template.revenue.events({
    'change #uploadBackup': function (event) {
        let ev = event.target;

        if (ev.files && ev.files[0]) {

            var reader = new FileReader();

            reader.onload = function (e) {
                var result = JSON.parse(e.target.result);

                result.forEach(function (expense) {
                    Revenues.insert(expense);

                    window.setTimeout(function () { }, 400);
                });

            };

            reader.readAsText(ev.files[0]);

        }
    },
    'click .js-remove-revenue': function (event, template) {
        event.preventDefault();
        let id = event.target.id;

        console.log(id);

        Revenues.remove(id);
    },
    'click .js-test': function () {
        var check = moment(new Date(), 'YYYY/MM/DD');

        var old = moment(new Date()).subtract(1, 'year');
        var month = check.format('M');
        var year = check.format('YYYY');

        let revenuesOld = Revenues.find({ "year": old.format('YYYY'), "month": month }).fetch();

        let revenues = Revenues.find({ "year": year, "month": month }).fetch();

        let oldTotal = 0;
        let total = 0;

        for (let i = 0; i < revenuesOld.length; i++) {
            oldTotal = parseInt(oldTotal) + parseInt(revenuesOld[i].value);
        }

        for (let i = 0; i < revenues.length; i++) {
            total = parseInt(total) + parseInt(revenues[i].value);
        }

        console.log(total);
        console.log(oldTotal);

        let diffPercent = ((total - oldTotal) / oldTotal) * 100;

        console.log(diffPercent.toFixed(2) + "%");
    }
});
