var React = require('react');
var History = require('react-router').History;
var AudioPlayerActions = require('../../actions/audio_player_actions');


var TrackIndexItem = React.createClass({
  mixins: [History],

  showTrack: function (e) {
    e.preventDefault();
    this.history.pushState(null, '/track/' + this.props.track.id, {});
  },

  addToPlayerStore: function () {
    AudioPlayerActions.setTrack(this.props.track);
    // AudioPlayerActions.playAudio();
  },

  render: function () {

    return (
      <div className="group">
        <button className="track-index-item-button" onClick={this.addToPlayerStore}>
          <i className="fa fa-play-circle fa-4x"></i>
        </button>
        <ul className="track-index-item-details">
          <li className="track-index-item-artist">{this.props.track.artist}</li>
          <li className="track-index-item-title" onClick={this.showTrack}>
            {this.props.track.title}
          </li>
        </ul>
      </div>
    );
  }

});

module.exports = TrackIndexItem;
