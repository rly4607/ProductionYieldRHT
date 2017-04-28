var React = require('react')

var Movie = require('./Movie')

var MovieList = React.createClass({
  getInitialState: function() {
    return { movies: [] }
  },
  componentDidMount: function() {
    var url = "https://buyflix-server-eng.c9users.io/movies.json"
    fetch(url).then(function(response) {
      return response.json()
    }).then(function(json) {
      this.setState({
        movies: json
      })
    }.bind(this))
  },
  renderMovie: function(movie) {
    return (
      <Movie key={movie.id}
             movie={movie}
             movieClicked={this.props.movieClicked} />
    )
  },
  render: function() {
    return (
      <div className="movies col-sm-12">
        <div className="row">
          {this.state.movies.map(this.renderMovie)}
        </div>
      </div>
    )
  }
})

module.exports = MovieList