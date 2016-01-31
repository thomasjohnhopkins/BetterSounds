var React = require("react");
var AudioPlayerStore = require("../../stores/player");
var AudioPlayerActions = require("../../actions/audio_player_actions");

var PlayButton = require("./playButton");

var TimeDisplay = require("./timeDisplay");
var DurationDisplay = require("./durationDisplay");

var Display = React.createClass({
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

  // componentWillUpdate: function (nextProps, nextState) {
  //   if (nextState.isEnded) {
  //     logic to play reset next track
  //   }
  // },

  componentWillUnmount: function () {
    this.audioPlayerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  _playAudio: function () {
    AudioPlayerActions.playAudio();
  },

  _pauseAudio: function () {
    AudioPlayerActions.pauseAudio();
  },

  _adjustVolumeTo: function (volume) {
    AudioPlayerActions.changeVolume(volume);
  },

  render: function () {
    if (AudioPlayerStore.fetchTrack() === {}) { return <div />; }

    return (
      <div id="audio-player">
        <section className="controller group">

          <figure className="audio-controller">

            <PlayButton playAudio={ this._playAudio }
              pauseAudio={ this._pauseAudio }
              isPlaying={ this.state.isPlaying }
              isPaused={ this.state.isPaused } />

          </figure>

          <figure className="audio-timeline">
            <TimeDisplay currentTime={ this.state.currentTime } />

            <div>:</div>

            <DurationDisplay duration={ this.state.duration } />
          </figure>

          <figure className="audio-id">
            { this.state.track.title } : { this.state.track.artist }
          </figure>

        </section>
      </div>
    );
  }
});

module.exports = Display;
