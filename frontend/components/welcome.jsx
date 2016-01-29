var React = require('react');
var History = require('react-router').History;
var TrackIndex = require('./track/trackIndex');

var Welcome = React.createClass({
  mixins: [History],

  render: function () {
    return(
      <div>
        <p>Welcome to Better Sounds!</p>
        <TrackIndex />
      </div>
    );
  }
});

module.exports = Welcome;
