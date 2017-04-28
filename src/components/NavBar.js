var React = require('react')

var NavBarItem = require('./NavBarItem')

var NavBar = React.createClass({
  render: function() {
    return (
      <div className="sort row">
        <div className="col-sm-12">
          <ul className="nav nav-pills">
            <NavBarItem view="ProdYield" title="Production Yield" currentView={this.props.currentView} viewChanged={this.props.viewChanged} />
            <NavBarItem view="rma" title="RMA Data" currentView={this.props.currentView} viewChanged={this.props.viewChanged} />
            <NavBarItem view="temp" title="Test Page" currentView={this.props.currentView} viewChanged={this.props.viewChanged} />
          </ul>
        </div>
      </div>
    )
  }
})

module.exports = NavBar
