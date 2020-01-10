

Template.revenue.onRendered(function () {
    var controller = Iron.controller();
    controller.render('revenueInfo', { to: 'nav-panel-info' });

    let obj = Revenues.find({}, { fields: { _id: 0, user_id: 0 } }).fetch();

    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

    $('<a class="button" href="data:' + data + '" download="revenueBackup.json">Backup</a>').appendTo('#revenueBackup');
})

Template.revenue.helpers({
    'dailyRevenue': function () {
        return Revenues.find({}, { sort: { stamp: -1 } }).fetch();
    }
});

Template.revenue.events({
    'change #uploadBackup': function (event) {
        let ev = event.target;

        if (ev.files && ev.files[0]) {

            var reader = new FileReader();

            reader.onload = function (e) {
                var result = JSON.parse(e.target.result);

                result.forEach(function(expense){
                    Revenues.insert(expense);

                    window.setTimeout(function(){}, 400);
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
    'click .js-test': function(){
        var check = moment(new Date(), 'YYYY/MM/DD');

        var old = moment(new Date()).subtract(1, 'year');
        var month = check.format('M');
        var year = check.format('YYYY');

        let  revenuesOld =  Revenues.find({"year": old.format('YYYY'), "month": month}).fetch();

        let revenues = Revenues.find({"year": year, "month": month}).fetch();

        let oldTotal = 0;
        let total = 0;

        for(let i = 0; i < revenuesOld.length; i++){
            oldTotal = parseInt(oldTotal) + parseInt(revenuesOld[i].value);
        }

        for(let i = 0; i < revenues.length; i++){
            total = parseInt(total) + parseInt(revenues[i].value);
        }

        console.log(total);
        console.log(oldTotal);

        let diffPercent = ((total-oldTotal) / oldTotal) * 100;

        console.log(diffPercent.toFixed(2) + "%");
    }
});
