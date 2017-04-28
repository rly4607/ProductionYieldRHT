var React = require('react')

var ReactChartJS = require('react-chartjs-2')
var {Pie} = ReactChartJS
var {Bar} = ReactChartJS

var Failure = require('./Failure')

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

var YieldData = require('../data/ProductionYields.json')

var ProdYieldChart = React.createClass({
  handleChange: function(event) {
    this.setState({
      query: event.value
    })
  },
  handleChangeDate: function(event) {
    event.preventDefault();

    this.setState({
      startDate: this.state.tempStart,
      finishDate: this.state.tempFinish
    })
  },
  handleChangeDate1: function(event) {
    event.preventDefault();
    this.setState({
      tempStart: event.target.value
    })
  },
  handleChangeDate2: function(event) {
    this.setState({
      tempFinish: event.target.value
    })
  },
  getInitialState: function() {
    return {
      query: "Loading...",
      startDate: "1/1/2010",
      finishDate: "1/1/2020",
      tempStart: "1/1/2010",
      tempFinish: "1/1/2020"
    }
  },
  render: function() {

    // Filter out blank rows from JSON data

    Array.prototype.contains = function(v) {
        for(var i = 0; i < this.length; i++) {
            if(this[i] === v) return true;
        }
        return false;
    };

    Array.prototype.unique = function() {
        var arr = [];
        for(var i = 0; i < this.length; i++) {
            if(!arr.contains(this[i])) {
                arr.push(this[i]);
            }
        }
        return arr;
    }

    var FilteredData = [0]
    var ProductTypes = [0]
    var DateRange = [0]
    var i=0;
    var k=0;

    for (i=0; i<YieldData.length; i++) {
      if(YieldData[i]["Part Type"]) {
        FilteredData[k] = YieldData[i];
        ProductTypes[k] = FilteredData[k]["Part Number"];
        DateRange[k] = FilteredData[k].Date;
        FilteredData[k].DateData = new Date(FilteredData[k].Date);
        k++;
      }
    }

    window.FilteredData = FilteredData
    window.DateRange = DateRange

    const MenuOptions = ProductTypes.unique()

    if(this.state.query === "Loading...") {
      var testCase = MenuOptions[0];
    }
    else {
      testCase = this.state.query;
    }

    var startDateData = new Date(this.state.startDate)
    var finishDateData = new Date(this.state.finishDate)

    const Day = 86400000;
    var numDays = (finishDateData.getTime()-startDateData.getTime())/Day;

    var DateArray = []
    var BarFailures = []
    k = 0;

    for (i=0; i<=numDays; i++) {
      DateArray[i] = new Date();
      DateArray[i].setTime(startDateData.getTime() + i*Day);
      BarFailures[i] = 0;
      for(k=0; k<FilteredData.length; k++) {
        if((DateArray[i].getTime() === FilteredData[k].DateData.getTime()) && (FilteredData[k]["Pass / Fail"] === 'Fail') && (FilteredData[k]["Part Number"] === testCase)) {
          BarFailures[i]++;
        }
      }
    }

    window.DateArray = DateArray

  //  console.log("StartTime: ", startDateData.getTime(), " FinishTime: ", finishDateData.getTime(), " Num Days = ", numDays)

    k=0;
    var FailArray = [];
    var Pass = 0;
    var Fail = 0;

    for (i=0; i<FilteredData.length; i++) {
      if((FilteredData[i]["Part Number"] === testCase) && (FilteredData[i].DateData.getTime() >= startDateData.getTime()) && (FilteredData[i].DateData.getTime() <= finishDateData.getTime())) {
        if(FilteredData[i]["Pass / Fail"] === 'Fail') {
          FailArray[k]=FilteredData[i];
          k++;
          Fail++;
        }
        else {
          Pass++;
        }
      }
    }


    var PassLabel = "Pass: " + Math.round((Pass/(Pass+Fail))*100) + "%"
    var FailLabel = "Fail: " + Math.round((Fail/(Pass+Fail))*100) + "%"

    var data = {
      labels: [
        PassLabel,
        FailLabel
      ],
      datasets: [
        {
          data: [Pass, Fail],
          backgroundColor: [
              "#36A2EB",
              "#FF6384"
          ],
          hoverBackgroundColor: [
              "#000088",
              "#FF0000"
          ]
        }
      ]
    }

    var ChartOptions = {}

    var barData = {
      labels: DateArray,
      datasets: [
        {
          label: 'Date',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          fontSize: 8,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: BarFailures
        }
      ]
    }

    var barOptions = {
      maintainAspectRatio: true,
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 7
          }
        }]
      }
    }

    // console.log("States... Query: ", this.state.query, " startDate: ", this.state.startDate, " finishDate: ", this.state.finishDate)

    return (
      <div className="row">
        <div className="col-sm-4 SelectMenu">
          <h2 className="select">Select Product: </h2>
          <Dropdown options={MenuOptions} onChange={this.handleChange} value={this.state.query} label={this.state.query} placeholder={this.state.query} />
          <h2 className="select">Enter Date Range:</h2>
          <form className="form-inline" onSubmit={this.handleChangeDate}>
            <h2 className="results">Begin: <input type="text" name="startDate" className="form-control" value={this.state.tempStart} onChange={this.handleChangeDate1} />&nbsp;
            <input type="submit" value="Go" /> </h2>
            <h2 className="results">End: <input type="text" name="finishDate" className="form-control" value={this.state.tempFinish} onChange={this.handleChangeDate2}/>&nbsp; </h2>
          </form>
          <br />
          <h2 className="results">Product: {this.state.query}</h2>
          <h2 className="results">Date Range: {this.state.startDate + " to " + this.state.finishDate}</h2>
          <h2 className="results">Total Units Tested: {Math.round(Pass+Fail)}</h2>
          <h2 className="results">Units Passed: {Math.round(Pass)}</h2>
          <h2 className="results">Units Failed: {Math.round(Fail)}</h2>
          <br/>
          <h2 className="select">Failure Details: </h2>
          <ul className="list-group">
            {FailArray.map(function(failure) {
              return <Failure failure={failure} />
            })}
          </ul>
        </div>
        <div className="map col-sm-8">
          <Pie data={data} height={150} options={ChartOptions} />
          <br />
          <Bar data={barData} height={150} options={barOptions} />
        </div>
      </div>
    )
  }
})

module.exports = ProdYieldChart
