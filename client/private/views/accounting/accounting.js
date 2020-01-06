Template.accounting.onRendered(function(){
    var controller = Iron.controller();
    controller.render('accountingInfo', { to: 'nav-panel-info' });
});

Template.accounting.helpers({
    'getYears': function(){
        let check = moment(new Date(), 'YYYY/MM/DD');
        let old = moment(new Date()).subtract(1, 'year');

        return {"current": check.format('YYYY'), "old": old.format('YYYY')}
    },
    'currentYearTotal': function(){
        var check = moment(new Date(), 'YYYY/MM/DD');

        var month = check.format('M');
        var year = check.format('YYYY');

        let revenues = Revenues.find({"year": year, "month": month}).fetch();

        let total = 0;

        for(let i = 0; i < revenues.length; i++){
            total = parseInt(total) + parseInt(revenues[i].value);
        }

        return total;
    },
    'lastYearTotal': function(){
        var check = moment(new Date(), 'YYYY/MM/DD');

        var old = moment(new Date()).subtract(1, 'year');
        var month = check.format('M');

        let  revenuesOld =  Revenues.find({"year": old.format('YYYY'), "month": month}).fetch();

        let oldTotal = 0;

        for(let i = 0; i < revenuesOld.length; i++){
            oldTotal = parseInt(oldTotal) + parseInt(revenuesOld[i].value);
        }

        return oldTotal;
    },
    'diffPreviousYear': function(total, oldTotal){

        let diffPercent = ((total-oldTotal) / oldTotal) * 100;

        return diffPercent.toFixed(2) + "%";
    }
});