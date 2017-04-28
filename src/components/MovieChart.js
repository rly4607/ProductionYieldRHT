var React = require('react')

var ReactChartJS = require('react-chartjs-2')
var {Bar} = ReactChartJS

var movies = require('../data/movies.json')

var MovieChart = React.createClass({
  render: function() {
    // You'll probably have to convert the movie runtime from a string to integer
    // parseInt("69 hot dogs eaten in 10 minutes")
    // => 69

    // Create two arrays - one for team names, and one for WS wins
    var movieNames = []
    var runtimes = []
    movies.forEach(function(movie) {
      movieNames.push(movie.title)
      runtimes.push(parseInt(movie.runtime))
    })

    // ChartJS data object
    var data = {
      labels: movieNames,
      datasets: [
        {
          label: 'Movie Runtime',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          fontSize: 8,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: runtimes
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

module.exports = MovieChart
