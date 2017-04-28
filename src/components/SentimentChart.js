var React = require('react')

var ReactChartJS = require('react-chartjs-2')
var {Polar} = ReactChartJS

var tweets = require('../data/trumps_tweets.json')

var SentimentChart = React.createClass({
  render: function() {
    var positive = new RegExp("chance|hope|thank|best|exciting|wonderful|winning|tomorrow|safe|special|love|true", "i")
    var negative = new RegExp("sad|bad|crazy|lost|worse|disaster|killing|unfair|tough|angry|crime|mess|dirty|crooked", "i")
    var positiveIphone = 0
    var positiveAndroid = 0
    var negativeIphone = 0
    var negativeAndroid = 0
    tweets.forEach(function(tweet) {
      if (tweet.text.match(positive)) {
        if (tweet.statusSource === 'android') {
          positiveAndroid += 1
        } else {
          positiveIphone += 1
        }
      } else if (tweet.text.match(negative)) {
        if (tweet.statusSource === 'android') {
          negativeAndroid += 1
        } else {
          negativeIphone += 1
        }
      }
    })
    var data = {
      datasets: [
        {
          data: [positiveIphone, positiveAndroid, negativeIphone, negativeAndroid],
          backgroundColor: ["#92DCE5", "#449DD1", "#F15025", "#F02D3A"],
        }
      ],
      labels: ["Positive iPhone", "Positive Android", "Negative iPhone", "Negative Android"]
    }
    var options = {
    }
    return (
      <div className="map col-sm-12">
        <Polar data={data} height={120} options={options} />
      </div>
    )
  }
})

module.exports = SentimentChart
