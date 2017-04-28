var React = require('react')

var ReactChartJS = require('react-chartjs-2')
var {Bar} = ReactChartJS

var teams = require('../data/baseball.json')

var BaseballChart = React.createClass({
  render: function() {
    // Create two arrays - one for team names, and one for WS wins
    var teamNames = []
    var worldSeries = []
    teams.forEach(function(team) {
      teamNames.push(team.name)
      worldSeries.push(team.world_series / (2017 - team.established))
    })

    // ChartJS data object
    var data = {
      labels: teamNames,
      datasets: [
        {
          label: 'World Series Wins',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          fontSize: 8,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: worldSeries
        }
      ]
    }

    // ChartJS options
    var options = {
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 7
          }
        }]
      }
    }

    return (
      <Bar data={data} height={480} options={options} />
    )
  }
})

module.exports = BaseballChart
