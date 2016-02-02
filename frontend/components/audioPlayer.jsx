var React = require('react');
var AudioPlayerStore = require('../stores/player');
var AudioPlayerActions = require('../actions/audio_player_actions');

var AudioPlayer = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    
    return {
      track: AudioPlayerStore.fetchTrack(),
      playTrack: AudioPlayerStore.playTrack(),
      pauseTrack: AudioPlayerStore.pauseTrack(),
      changeVolumeTo: AudioPlayerStore.changeVolumeTo(),
      currentTime: AudioPlayerStore.getCurrentTime()
    };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  componentDidMount: function () {
    this.audioPlayerToken = AudioPlayerStore.addListener(this._onChange);
  },

  componentWillUpdate: function (nextProps, nextState) {
    this._handlePlayRequest(nextState.playTrack);
    this._handlePauseRequest(nextState.pauseTrack);
    this._handleVolumeChangeRequest(nextState.changeVolumeTo);
  },

  componentWillUnmount: function () {
    this.audioPlayerToken.remove();
  },

  _handlePlayRequest: function (request) {
    var currentTimeHash = "#t=" + this.state.currentTime.toString();
    if (request) {
      this.refs.audio.src = AudioPlayerStore.fetchTrack().audio_url + currentTimeHash;
      this.refs.audio.play();
      AudioPlayerActions.resetRequests();
    }
  },

  _handlePauseRequest: function (request) {
    if (request) {
      this.refs.audio.pause();
      AudioPlayerActions.resetRequests();
    }
  },

  _handleVolumeChangeRequest: function (request) {
    if (request) {
      this.refs.audio.volume = request;
      AudioPlayerActions.resetRequests();
    }
  },

  _handlePlay: function () {
    AudioPlayerActions.setToIsPlaying();
  },

  _handlePause: function () {
    AudioPlayerActions.setToIsPaused();
  },

  _handleOver: function () {
    AudioPlayerActions.setToOver();
  },

  _updateTime: function () {
    AudioPlayerActions.setCurrentTime(this.refs.audio.currentTime);
  },

  _handleVolumeChange: function () {
    AudioPlayerActions.setVolume(this.refs.audio.volume);
  },

  _handleDurationChange: function () {
    AudioPlayerActions.getDuration(this.refs.audio.duration);
  },

  render: function () {
    return(
      <audio ref="audio"
        id="audio"
        onPlaying={ this._handlePlay }
        onPause={ this._handlePause }
        onTimeUpdate={ this._updateTime }
        onEnded={ this._handleOver }
        onVolumeChange={ this._handleVolumeChange }
        onDurationChange={ this._handleDurationChange }>

        <p>Sorry, your browser does not support BetterSounds player</p>
      </audio>
    );
  },
});

module.exports = AudioPlayer;
