var React = require('react');
var ApiUtil = require('../../util/api_util');
var History = require('react-router').History;
var TrackStore = require('../../stores/track');
var trackIndexItem = require('./trackIndexItem');
var AudioPlayerActions = require('../../actions/audio_player_actions');
var TrackComments = require('./trackComments');
var TrackDetails = require('./trackDetails');

var TrackShow = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    return { track: TrackStore.find(parseInt(this.props.params.trackId)) };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.trackListener = TrackStore.addListener(this._onChange);
    ApiUtil.fetchAllTracks();
  },

  componentWillUnmount: function () {
    this.trackListener.remove();
  },

  addToPlayerStore: function () {
    AudioPlayerActions.setTrack(this.state.track);
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
    }

    return (
      <div>
        <div className="track-banner group">

          <button className="track-show-play-button" onClick={this.addToPlayerStore}>
            <i className="fa fa-play-circle fa-5x"></i>
          </button>

          <ul className="track-show-details">
            <li className="track-show-artist">{artist}</li>
            <li className="track-show-title" onClick={this.showTrack}>
              {title}
            </li>
          </ul>
          <div className="days-since-created">{days}</div>

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
