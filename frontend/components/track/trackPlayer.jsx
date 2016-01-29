var React = require('react');


var TrackPlayer = React.createClass({

  render: function () {
    return (
      <div className="track-player">
        <ul className="track-player-details">
          <li className="track-player-artist">{this.props.track.artist}</li>
          <li className="track-player-title">{this.props.track.title}</li>
        </ul>
        <audio src={this.props.track.audio_url} controls></audio>
      </div>
    );
  }

});

module.exports = TrackPlayer;
