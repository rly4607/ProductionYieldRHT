var React = require('react')

var Movie = React.createClass({
  render: function() {
    return (
      <div className="col-sm-2">
        <div className="thumbnail">
          <img role="presentation" className="img-responsive" src={this.props.movie.poster} />
          <div className="caption">
            <h3>{this.props.movie.title}</h3>
            <p>{this.props.movie.genre}</p>
            <p>{this.props.movie.runtime}</p>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Movie