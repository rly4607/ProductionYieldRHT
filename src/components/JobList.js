var React = require('react')

var Job = require('./Job')

var JobList = React.createClass({
  handleChange: function(event) {
    this.setState({
      query: event.target.value
    })
  },
  handleSubmit: function(event) {
    event.preventDefault()
    // what's typed into the search box = this.state.query
    var url = "https://api.usa.gov/jobs/search.json?query=" + this.state.query + "&size=100"
    fetch(url).then(function(response) {
      return response.json()
    }).then(function(json) {
      this.setState({
        jobs: json
      })
    }.bind(this))
  },
  getInitialState: function() {
    return { jobs: [], query: "information technology" }
  },
  render: function() {
    return (
      <div className="col-sm-12">
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <input type="text" className="form-control" value={this.state.query} onChange={this.handleChange} />&nbsp;
          <button type="submit" className="btn btn-success">Find jobs!</button>
        </form>
        <br/>
        <ul className="list-group">
          {this.state.jobs.map(function(job) {
            return <Job key={job.id} job={job} />
          })}
        </ul>
      </div>
    )
  }
})

module.exports = JobList
