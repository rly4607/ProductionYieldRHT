var React = require('react')

var ReactChartJS = require('react-chartjs-2')
var {Pie} = ReactChartJS

var RMAs = require('../data/RMA_Results.json')

var RMAChart = React.createClass({
  render: function() {
    var PCBA = RMAs.reduce(function(count, failure) {
      console.log(failure.Simplified === 'Board Component' && (failure.DOM.includes("/2015") || failure.DOM.includes("/2016")))
      return count + (failure.Simplified === 'Board Component' && (failure.DOM.includes("/2015") || failure.DOM.includes("/2016")))
    }, 0)
    var ComE = RMAs.reduce(function(count, failure) {
      return count + (failure.Simplified === 'ComE')
    }, 0)
    var RTC = RMAs.reduce(function(count, failure) {
      return count + (failure.Simplified === 'RTC')
    }, 0)
    var LVDS = RMAs.reduce(function(count, failure) {
      return count + (failure.Simplified === 'LVDS')
    }, 0)
    var LCD = RMAs.reduce(function(count, failure) {
      return count + (failure.Simplified === 'LCD')
    }, 0)
    var NFF = RMAs.reduce(function(count, failure) {
      return count + (failure.Simplified === 'NFF')
    }, 0)
    var Customer = RMAs.reduce(function(count, failure) {
      return count + (failure.Simplified === 'Customer')
    }, 0)
    var Uprev = RMAs.reduce(function(count, failure) {
      return count + (failure.Simplified === 'Uprev')
    }, 0)
    var data = {
      labels: [
        "PCBA / Component",
        "COM Express Module",
        "RTC / BIOS",
        "LVDS Cable",
        "LCD Panel",
        "No Fault Found",
        "Customer Induced",
        "Uprev"
      ],
      datasets: [
        {
          data: [PCBA, ComE, RTC, LVDS, LCD, NFF, Customer, Uprev],
          backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#36FFEB",
              "#FFA2EB",
              "#FF6300",
              "#11A2EB",
              "#3611EB",
              "#FF1111"
          ],
          hoverBackgroundColor: [
              "#000088",
              "#000088",
              "#000088",
              "#000088",
              "#000088",
              "#000088",
              "#000088",
              "#000088"
          ]
        }
      ]
    }
    var options = {}
    return (
      <div className="map col-sm-12">
        <Pie data={data} height={120} options={options} />
      </div>
    )
  }
})

module.exports = RMAChart
