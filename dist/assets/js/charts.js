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

var chartSelectors = ['ageOver65', 'ageUnder10', 'gender', 'race'];
var numberSelectors = ['population', 'funding', 'services'];

function updateNumbers(data) {
  numberSelectors.forEach(s => {
    var text = 'Coming Soon';
    if (data) {
      if (s === 'population') {
        text = data.pop.toLocaleString();
      }
    }
    $('#' + s).text(text);
  });
}

function toPercent(num1, num2) {
  return (num1 / num2 * 100).toFixed(1) + "%";
}

function updateCharts(data) {
  if (!data) return;
  chartSelectors.forEach(s => {
      config.series[0].name = s.charAt(0).toUpperCase() + s.slice(1);
      if (s === 'ageOver65') {
        config.series[0].name = "Age";
        config.title.text = toPercent(data.pop_over_65, data.pop);
        config.series[0].data = [
          ['Over 65', data.pop_over_65],
          ['Under 65', data.pop - data.pop_over_65]
        ];
      }
      if (s === 'gender') {
        config.title.text = toPercent(data.pop_female, data.pop);
        config.series[0].data = [
          ['Female', data.pop_female],
          ['Male', data.pop - data.pop_female]
        ];
      }
      if (s === 'race') {
        config.title.text = toPercent(data.pop_color, data.pop);
        config.series[0].data = [
          ['Population of color', data.pop_color],
          ['Other', data.pop - data.pop_color]
        ];
      }
      if (s === 'ageUnder10') {
        config.series[0].name = "Age";
        config.title.text = toPercent(data.pop_below_10, data.pop);
        config.series[0].data = [
          ['Under 10', data.pop_below_10],
          ['Over 10', data.pop - data.pop_below_10]
        ];
      }
      Highcharts.chart(s, config);
  });
}
