var React = require('react')

var Failure = React.createClass({
  render: function() {
    return (
      <li className="list-group-item">
        <h4 className="list-group-item-heading">S/N: {this.props.failure["Serial Number"]}</h4>
        <p className="list-group-item-text">Test Date: {this.props.failure.Date}</p>
        <p className="list-group-item-text">Failure: {this.props.failure["Failure Type"]}</p>
        <p className="list-group-item-text">Notes: {this.props.failure.Details}</p>
      </li>
    )
  }
})

module.exports = Failure
