var React = require('react');
var History = require('react-router').History;
var AudioPlayerActions = require('../../actions/audio_player_actions');
var AudioPlayerStore = require('../../stores/player');


var TrackIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return {
      track: AudioPlayerStore.fetchTrack(),
      isPlaying: AudioPlayerStore.isPlaying(),
      isPaused: AudioPlayerStore.isPaused(),
      isEnded: AudioPlayerStore.isEnded(),
      currentTime: AudioPlayerStore.getCurrentTime(),
      volume: AudioPlayerStore.getVolume(),
      duration: AudioPlayerStore.getDuration()
    };
  },

  componentDidMount: function () {
    this.audioPlayerToken = AudioPlayerStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.audioPlayerToken.remove();
  },

  showTrack: function (e) {
    e.preventDefault();
    this.history.pushState(null, '/track/' + this.props.track.id, {});
  },

  showUser: function (e) {
    e.preventDefault();
    this.history.pushState(null, '/user/' + this.props.user.id, {});
  },

  addToPlayerStore: function () {
    if (this.state.track === this.props.track && this.state.isPlaying) {
      AudioPlayerActions.pauseAudio();
    } else if (this.state.track === this.props.track ) {
      AudioPlayerActions.playAudio();
    } else {
      AudioPlayerActions.setTrack(this.props.track);
    }
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  render: function () {

    var icon;

    if (this.state.track === this.props.track && this.state.isPlaying) {
      icon = <i className="fa fa-pause-circle fa-4x"></i>;
    } else {
      icon = <i className="fa fa-play-circle fa-4x"></i>;
    }

    return (
      <div className="group">
        <button className="track-index-item-button" onClick={this.addToPlayerStore}>
          {icon}
        </button>
        <ul className="track-index-item-details">
          <li className="track-index-item-artist" onClick={this.showUser}>
            {this.props.track.artist}
          </li>
          <li className="track-index-item-title" onClick={this.showTrack}>
            {this.props.track.title}
          </li>
        </ul>
      </div>
    );
  }

});

module.exports = TrackIndexItem;
