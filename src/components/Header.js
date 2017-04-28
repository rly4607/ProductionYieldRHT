var React = require('react')

var Header = React.createClass({
  render: function() {
    return (
      <div className="header row">
        <div className="col-sm-9">
          <h1>Production Yield Data</h1>
        </div>
        <div className="LogoImg col-sm-3">
          <img className="HeaderImg img-responsive" role="presentation" src="./RHT.png"></img>
        </div>
      </div>
    )
  }
})

module.exports = Header
