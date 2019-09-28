Template.dashboard.onRendered(function(){
    /* $(document).ready(function () {
        console.log("dashboard and jquery ready");
        // Main Template Color
        var brandPrimary = '#33b35a';
    
    
        // ------------------------------------------------------- //
        // Line Chart
        // ------------------------------------------------------ //
        var LINECHART = $('#lineChart');
        var myLineChart = new Chart(LINECHART, {
            type: 'line',
            options: {
                legend: {
                    display: false
                }
            },
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        fill: true,
                        lineTension: 0.3,
                        backgroundColor: "rgba(77, 193, 75, 0.4)",
                        borderColor: brandPrimary,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        borderWidth: 1,
                        pointBorderColor: brandPrimary,
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: brandPrimary,
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 0,
                        data: [1, 2, 1, 0, 0, 1, 0],
                        spanGaps: false
                    }
                ]
            }
        });
    
    }); */
});

Template.dashboard.helpers({
    'counts':function(){
        let data = {
            'devices': Devices.find().count(),
            'collections': Collections.find().count(),
            'items': Items.find().count(),
        }

        return data;
    }
});