var React = require('react');

var TrackDetails = React.createClass({
  render: function () {
    return (
      <ul className="track-details">
        <li className="track-detail">{this.props.track.title}</li>
      </ul>
    );
  }
});

module.exports = TrackDetails;
