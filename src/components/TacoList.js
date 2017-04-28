var React = require('react')

var tacos = require('../data/tacos.json')

var TacoList = React.createClass({
  render: function() {
    return (
      <div className="col-sm-12">
        <ul className="list-group">
          {tacos.map(function(place) {
            return (
              <li key={place.name} className="list-group-item">
                <h4 className="list-group-item-heading">{place.name}</h4>
                <p className="list-group-item-text">{place.address[0]}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
})

module.exports = TacoList