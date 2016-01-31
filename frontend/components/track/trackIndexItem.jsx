var React = require('react');
var History = require('react-router').History;
var AudioPlayerActions = require('../../actions/audio_player_actions');


var TrackIndexItem = React.createClass({
  mixins: [History],

  showTrack: function () {
    this.history.pushState(null, '/track/' + this.props.track.id, {});
  },

  addToPlayerStore: function () {
    AudioPlayerActions.setTrack(this.props.track);
  },

  render: function () {

    return (
      <div className="track-player">
        <ul className="track-player-details">
          <li className="track-player-artist">{this.props.track.artist}</li>
          <li className="track-player-title" onClick={this.showTrack}>
            {this.props.track.title}
          </li>
          <li className="track-play-button" onClick={this.addToPlayerStore}>
            Play track
          </li>
        </ul>
      </div>
    );
  }

});

module.exports = TrackIndexItem;
