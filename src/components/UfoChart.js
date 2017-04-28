var React = require('react')

var ReactChartJS = require('react-chartjs-2')
var {Bar} = ReactChartJS

var sightings = require('../data/ufo.json')
var usStates = require('../data/us_states.json')
var polls = require('../data/P.full.json')

var UfoChart = React.createClass({
  render: function() {
    var red = 'rgba(255,99,132,0.5)'
    var blue = 'rgba(58,135,211,0.5)'
    var gray = 'rgba(130,135,139,0.5)'
    var dataByState = sightings.reduce(function(data, sighting) {
      data[sighting.state] = (data[sighting.state] || 0) + 1
      return data
    }, {})
    var statesSorted = Object.keys(dataByState).sort(function(a, b) {
      return dataByState[b] - dataByState[a]
    })
    var colors = statesSorted.map(function(stateCode) {
      var fullStateName = usStates[stateCode.toUpperCase()]
      var raceForState = polls.races.find(function(race) {
        return race.state === fullStateName && race.race === "President"
      })
      if (raceForState) {
        var trump = raceForState.candidates.find(function(candidate) {
          return candidate.party === "R"
        })
        return trump.winner ? red : blue
      } else {
        return gray
      }
    })
    var data = {
      labels: statesSorted,
      datasets: [
        {
          label: 'UFO Sightings',
          backgroundColor: colors,
          fontSize: 8,
          data: statesSorted.map(function(state) { return dataByState[state] })
        }
      ]
    }
    var options = {
      legend: {
        display: false
      },
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

module.exports = UfoChart