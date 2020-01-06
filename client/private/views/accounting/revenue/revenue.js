

Template.revenue.onRendered(function () {
    var controller = Iron.controller();
    controller.render('revenueInfo', { to: 'nav-panel-info' });

})

Template.revenue.helpers({
    'dailyRevenue': function () {
        return Revenues.find({}, { sort: { stamp: -1 } }).fetch();
    }
});

Template.revenue.events({

    'click .js-remove-revenue': function (event, template) {
        event.preventDefault();

        let id = event.target.id;


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
