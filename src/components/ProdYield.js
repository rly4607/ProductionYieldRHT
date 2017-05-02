var React = require('react')

var ReactChartJS = require('react-chartjs-2')
var {Pie} = ReactChartJS
var {Bar} = ReactChartJS

var Failure = require('./Failure')

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

var YieldData = require('../data/ProductionYields.json')

var ProdYieldChart = React.createClass({

  // This handles the change in seleted Product (AY03- whatever)

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
    var TodaysDate = new Date(Date());

    return {
      query: "Loading...",
      startDate: "1/1/2015",
      finishDate: TodaysDate.getMonth()+1 + "/" + TodaysDate.getDate() + "/" + (TodaysDate.getYear()+1900),
      tempStart: "1/1/2015",
      tempFinish: TodaysDate.getMonth()+1 + "/" + TodaysDate.getDate() + "/" + (TodaysDate.getYear()+1900),
    }
  },
  render: function() {

    // Find unique values in data using the following funtions:

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

    // Filter out blank rows in JSON data:

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


    // Create the dropdown menu options by filtering on unique entries:

    var ProductsUnique = ProductTypes.unique()
    var MenuOptions = []

    for (i=0; i<ProductsUnique.length; i++) {
      MenuOptions[i] = {value: ProductsUnique[i], label: ProductsUnique[i]};
    }

    if(this.state.query === "Loading...") {
      var testCase = MenuOptions[0].value;
    }
    else {
      testCase = this.state.query;
    }

    // Set start and finish date for data search:

    var startDateData = new Date(this.state.startDate)
    var finishDateData = new Date(this.state.finishDate)

    const Day = 86400000;  // Number of milliseconds in a day
    var numDays = Math.round((finishDateData.getTime()-startDateData.getTime())/Day);

    var DateArray = [];
    var MonthArray = [];
    var YearArray = [];

    for (i=0; i<=numDays; i++) {
         DateArray[i] = new Date();
         DateArray[i].setTime(startDateData.getTime() + i*Day);
         MonthArray[i] = DateArray[i].getMonth();
         YearArray[i] = DateArray[i].getYear();
    }

    var YearUnique = YearArray.unique();
    var MonthUnique = MonthArray.unique();

    var numYears = YearUnique.length;
    var numMonths = MonthUnique.length;

//    console.log("Number of years: ", numYears, "Number of Months: ", numMonths, "Number of Days: ", numDays)

    var MonthText= new Array();
    MonthText[0] = "January";
    MonthText[1] = "February";
    MonthText[2] = "March";
    MonthText[3] = "April";
    MonthText[4] = "May";
    MonthText[5] = "June";
    MonthText[6] = "July";
    MonthText[7] = "August";
    MonthText[8] = "September";
    MonthText[9] = "October";
    MonthText[10] = "November";
    MonthText[11] = "December";


    // Find number of unique failures in Years, Months, or Days to make the bar
    // chart more readable depending on the range selected

    var BarTitle = "";
    var DateArrayFormatted = [];
    var BarFailures = [];
    k = 0;

    if ((numYears > 1) && (numMonths === 12)) {
      BarTitle = "Failures Per Year";

      for(i=0; i<numYears; i++) {

        DateArrayFormatted[i] = YearUnique[i]+1900;
        BarFailures[i] = 0;
        for(k=0; k<FilteredData.length; k++) {
          if((YearUnique[i] === FilteredData[k].DateData.getYear()) && (FilteredData[k]["Pass / Fail"] === 'Fail') && (FilteredData[k]["Part Number"] === testCase) && (FilteredData[k].DateData.getTime() >= startDateData.getTime()) && (FilteredData[k].DateData.getTime() <= finishDateData.getTime())) {
            BarFailures[i]++;
          }
        }
      }
    }
    else if (numDays >= 45) {
      BarTitle = "Failures Per Month";

      for(i=0; i<numMonths; i++) {

        DateArrayFormatted[i] = MonthText[MonthUnique[i]];
        BarFailures[i] = 0;
        for(k=0; k<FilteredData.length; k++) {
          if((MonthUnique[i] === FilteredData[k].DateData.getMonth()) && (FilteredData[k]["Pass / Fail"] === 'Fail') && (FilteredData[k]["Part Number"] === testCase) && (FilteredData[k].DateData.getTime() >= startDateData.getTime()) && (FilteredData[k].DateData.getTime() <= finishDateData.getTime())) {
            BarFailures[i]++;
          }
        }
      }
    }
    else {
      BarTitle = "Failures Per Day";

      for(i=0; i<=numDays; i++) {

        DateArray[i] = new Date();
        DateArray[i].setTime(startDateData.getTime() + i*Day);

        DateArrayFormatted[i] = MonthText[DateArray[i].getMonth()].slice(0,3) + " " + DateArray[i].getDate();

        BarFailures[i] = 0;
        for(k=0; k<FilteredData.length; k++) {
          if((DateArray[i].getTime() === FilteredData[k].DateData.getTime()) && (FilteredData[k]["Pass / Fail"] === 'Fail') && (FilteredData[k]["Part Number"] === testCase) && (FilteredData[k].DateData.getTime() >= startDateData.getTime()) && (FilteredData[k].DateData.getTime() <= finishDateData.getTime())) {
            BarFailures[i]++;
          }

        }
      }
    }

    // Find failures for the pie chart (could probably be combined with the bar chart)

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

    // Creat the labels for the Pie Chart

    var PassLabel = "Pass: " + Math.round((Pass/(Pass+Fail))*100) + "%"
    var FailLabel = "Fail: " + Math.round((Fail/(Pass+Fail))*100) + "%"

    var pieData = {
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

    var pieOptions = {}

    var barData = {
      labels: DateArrayFormatted,
      datasets: [
        {
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
      legend: {
          display: false
      },
      title: {
          display: true,
          text: BarTitle
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 10
          }
        }],
        yAxes: [{
          ticks: {
              min: 0,
              stepSize: 1
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
          <h2 className="results">Product: {testCase}</h2>
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
          <Pie data={pieData} height={150} options={pieOptions} />
          <br />
          <Bar data={barData} height={150} options={barOptions} />
        </div>
      </div>
    )
  }
})

module.exports = ProdYieldChart
