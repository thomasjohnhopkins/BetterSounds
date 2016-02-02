var React = require('react');
var History = require('react-router').History;
var TrackStore = require('../../stores/track');
var apiUtils = require('../../util/api_util');
var TrackIndexItem = require('./trackIndexItem');
var UserStore = require('../../stores/user');

var TrackIndex = React.createClass({
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
    apiUtils.fetchUsers();
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

// until track audio uploaded, I am just rendering info for each track

  render: function () {

    var allTracks = "";
    if (this.state !== null) {
      allTracks = this.state.tracks.map(function(track) {
        var user = UserStore.findUser(track.user_id);
        
        return <li className="track-index-item" key={track.id}>
          <TrackIndexItem track={track} user={user} />
        </li>;
      });
    }

    return(
      <div className="track-index">
        <ul>{allTracks}</ul>
      </div>
    );
  }
});

module.exports = TrackIndex;
