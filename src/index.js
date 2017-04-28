var React = require('react')
var ReactDOM = require('react-dom')

var Header = require('./components/Header')
var NavBar = require('./components/NavBar')
var RMAChart = require('./components/RMAResults')
var ProdYieldChart = require('./components/ProdYield')
var TempPage = require('./components/TempPage')

var App = React.createClass({
  viewChanged: function(view) {
    this.setState({
      currentView: view
    })
  },
  renderMainSection: function() {
    switch (this.state.currentView) {
      case "ProdYield":
        return <ProdYieldChart />
      case "rma":
        return <RMAChart />
      case "temp":
        return <TempPage />
      default:
        console.log("No view")
    }
  },
  getInitialState: function() {
    return {
      currentView: "ProdYield",
    }
  },
  render: function() {
    return (
      <div>
        <Header />
        <NavBar currentView={this.state.currentView} viewChanged={this.viewChanged} />
        <div className="main row">
          {this.renderMainSection()}
        </div>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById("app"))
