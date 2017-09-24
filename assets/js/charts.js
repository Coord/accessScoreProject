var config = {
    title: {
        text: '15%',
        style: {
            fontSize: '40px'
        },
        align: 'center',
        verticalAlign: 'middle',
        y: 15
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
            }
        }
    },
    series: [{
        animation: {
            duration: 3000
        },
        type: 'pie',
        name: 'Browser share',
        size: "100%",
  			innerSize: "90%",
  			pointPadding: 0,
  			groupPadding: 0,
        data: [
            ['Firefox',   10.38],
            ['IE',       56.33]
        ]
    }],
    credits: {
      enabled: false
    }
}

var selectors = ['age', 'gender', 'race', 'income', 'score'];
selectors.forEach(s => {
    Highcharts.chart(s, config);
});

console.log(data)
