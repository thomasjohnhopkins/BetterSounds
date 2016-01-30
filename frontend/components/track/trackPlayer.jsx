var React = require('react');
var History = require('react-router').History;


var TrackPlayer = React.createClass({
  mixins: [History],

  showTrack: function () {
    this.history.pushState(null, '/track/' + this.props.track.id, {});
  },

  render: function () {

    return (
      <div className="track-player">
        <ul className="track-player-details">
          <li className="track-player-artist">{this.props.track.artist}</li>
          <li className="track-player-title" onClick={this.showTrack}>
            {this.props.track.title}
          </li>
        </ul>
        <audio src={this.props.track.audio_url} controls></audio>
      </div>
    );
  }

});

module.exports = TrackPlayer;
