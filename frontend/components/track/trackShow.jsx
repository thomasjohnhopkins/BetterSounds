var React = require('react');
var ApiUtil = require('../../util/api_util');
var History = require('react-router').History;
var TrackStore = require('../../stores/track');
var trackIndexItem = require('./trackIndexItem');
var AudioPlayerActions = require('../../actions/audio_player_actions');
var TrackComments = require('./trackComments');
var TrackDetails = require('./trackDetails');
var AudioPlayerStore = require('../../stores/player');


var TrackShow = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    return {
      track: TrackStore.find(parseInt(this.props.params.trackId)),
      isPlaying: AudioPlayerStore.isPlaying(),
      isPaused: AudioPlayerStore.isPaused(),
      isEnded: AudioPlayerStore.isEnded(),
      currentTime: AudioPlayerStore.getCurrentTime(),
      volume: AudioPlayerStore.getVolume(),
      duration: AudioPlayerStore.getDuration()
    };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.audioPlayerToken = AudioPlayerStore.addListener(this._onChange);
    this.trackListener = TrackStore.addListener(this._onChange);
    ApiUtil.fetchAllTracks();
  },

  componentWillUnmount: function () {
    this.audioPlayerToken.remove();
    this.trackListener.remove();
  },

  addToPlayerStore: function () {
    var currentTrack = AudioPlayerStore.fetchTrack();

    if (this.state.track.id === currentTrack.id && this.state.isPlaying) {
      AudioPlayerActions.pauseAudio();
    } else if (this.state.track.id === currentTrack.id && this.state.currentTime !== 0) {
      AudioPlayerActions.playAudio();
    } else {
      AudioPlayerActions.setTrack(this.state.track);
    }
  },

  findDateSinceCreated: function () {
    var dateCreated = new Date(this.state.track.created_at);
    var yearCreated = dateCreated.getUTCFullYear();
    var monthCreated = dateCreated.getUTCMonth();
    var dayCreated = dateCreated.getUTCDate();

    var dateUTC = Date.UTC(yearCreated, monthCreated, dayCreated);

    var difference = Date.now() - dateUTC;

    return Math.floor(difference / 86400000).toString();

  },

  render: function () {
    var title = "";
    var artist = "";
    var days = "";
    if (this.state.track) {
      title = this.state.track.title;
      artist = this.state.track.artist;

      if (this.findDateSinceCreated() === "1") {
        days = "1 day";
      } else {
        days = this.findDateSinceCreated() + " days";
      }
    } else {
      return <div></div>;
    }

    var icon;
    var currentTrack = AudioPlayerStore.fetchTrack();

    if (this.state.track.id === currentTrack.id && this.state.isPlaying) {
      icon = <i className="fa fa-pause-circle fa-5x"></i>;
    } else {
      icon = <i className="fa fa-play-circle fa-5x"></i>;
    }

    return (
      <div>
        <div className="track-banner group">
          <div className="track-show-player">
          <button className="track-show-play-button" onClick={this.addToPlayerStore}>
            {icon}
          </button>

          <ul className="track-show-details">
            <li className="track-show-artist">{artist}</li>
            <li className="track-show-title" onClick={this.showTrack}>
              {title}
            </li>
          </ul>
          <ul className="track-show-details-right group">
            <li className="track-show-image">
              <img
                className="track-show-image"
                src={this.state.track.image_url} />
            </li>
            <li className="days-since-created">{days}</li>
          
          </ul>
        </div>
      </div>
        <div className="track-info-container">
          <div className="comments">
            <TrackComments track={this.state.track} />
          </div>
          <div className="side-bar">
            <TrackDetails track={this.state.track} />
          </div>
        </div>
      </div>

    );
  }
});

module.exports = TrackShow;
