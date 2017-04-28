var React = require('react')

var csvPath = '../data/TestCsv.csv'

//import PapaParse from './papaparse.js'

/* var results = Papa.parse(csvPath, {
  delimiter: delim
});

console.log(results) */
/*
csv()
.fromFile(csvPath)
.on('json',(jsonObj)=>{
    // combine csv header row and csv line to a json object
    // jsonObj.a ==> 1 or 4
})
.on('done',(error)=>{
    console.log('end')
}) */

var Temp = React.createClass({

  render: function() {

    console.log("On Temp Page")

    return (
      <div className="row">
        <div className="col-sm-4 SelectMenu">
          <h2 className="select">Select Product: </h2>
        </div>
        <div className="map col-sm-8">
        </div>
      </div>
    )
  }
})

module.exports = Temp
