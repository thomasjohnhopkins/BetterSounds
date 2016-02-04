var React = require('react');
var History = require('react-router').History;
var TrackStore = require('../../stores/track');
var apiUtils = require('../../util/api_util');
var TrackIndexItem = require('./trackIndexItem');
var UserStore = require('../../stores/user');

var TrackIndex = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    var location = window.location.hash;
    var locationArray = location.split("/");
    var toShow;
    if (locationArray[1] === "user") {
      userToShow = UserStore.findUser(parseInt(locationArray[2].substring(0, 1)));
      usersTracks = TrackStore.findUsersTracks(userToShow);
    } else {
      userToShow = UserStore.findUser(parseInt(CurrentUserStore.currentUser().id));
      usersTracks = TrackStore.findUsersTracks(userToShow);
    }

    return { user: userToShow, tracks: usersTracks };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.listenerToken = TrackStore.addListener(this._onChange);
    this.UserListener = UserStore.addListener(this._onChange);
    apiUtils.fetchAllTracks();
    apiUtils.fetchUsers();
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
    this.UserListener.remove();
  },

// until track audio uploaded, I am just rendering info for each track

  render: function () {

    var allTracks = "";
    var that = this;
    if (this.state !== null) {
      allTracks = this.state.tracks.map(function(track) {
        var user = UserStore.findUser(track.user_id);

        return <li className="track-index-item" key={track.id}>
          <TrackIndexItem track={track} user={that.state.user} />
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
