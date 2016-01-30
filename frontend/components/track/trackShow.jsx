var React = require('react');
var ApiUtil = require('../../util/api_util');
var History = require('react-router').History;
var TrackStore = require('../../stores/track');
var TrackPlayer = require('./trackPlayer');

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

  render: function () {
    var title = "";
    var artist = "";
    if (this.state.track) {
      title = this.state.track.title;
      artist = this.state.track.artist;
    }

    return (
      <div>
        <div className="track-banner group">
          <button className="play-audio"></button>
          <div className="track-info">
            <h5>{artist}</h5>
            <h2>{title}</h2>
          </div>
          <div className="date-and-tags">

          </div>
        </div>
        <div className="side-bar">

        </div>
        <div className="comments">

        </div>
      </div>

    );
  }
});

module.exports = TrackShow;
