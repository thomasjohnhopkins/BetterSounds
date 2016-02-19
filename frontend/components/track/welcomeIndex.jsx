var React = require('react');
var History = require('react-router').History;
var TrackStore = require('../../stores/track');
var apiUtils = require('../../util/api_util');
var WelcomeIndexItem = require('./welcomeIndexItem');

var WelcomeIndex = React.createClass({
  mixins: [History],

  getIntialState: function () {
    return { tracks: TrackStore.all() };
  },

  _onChange: function () {
    this.setState({ tracks: TrackStore.all() });
  },

  componentDidMount: function () {
    this.listenerToken = TrackStore.addListener(this._onChange);
    apiUtils.fetchAllTracks();
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

// until track audio uploaded, I am just rendering info for each track

  render: function () {
    var that = this;
    var welcomeTracks = [];
    if (this.state !== null) {
      for (var i = 0; i < this.state.tracks.length && i < 12; i++) {
        
        welcomeTracks.push(<li
          className="welcome-index-items"
          key={this.state.tracks[i].id}>
            <WelcomeIndexItem track={this.state.tracks[i]} />
        </li>)
      }
    }

    return(
      <div className="welcome-index">
        <ul className="index-tracks group">{welcomeTracks}</ul>
      </div>
    );
  }
});

module.exports = WelcomeIndex;
