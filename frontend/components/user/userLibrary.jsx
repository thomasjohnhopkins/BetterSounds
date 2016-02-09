var React = require('react');
var History = require('react-router').History;
var TrackStore = require('../../stores/track');
var apiUtils = require('../../util/api_util');
var UserStore = require('../../stores/user');
var CurrentUserStore = require('../../stores/currentUser');
var TrackIndexItem = require('../track/trackIndexItem');

var UserLibrary = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    if (CurrentUserStore.currentUser().id === undefined) {
      return { user: '', tracks: '' };
    }
    var location = window.location.hash;
    var locationArray = location.split("/");
    var userToShow;
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
    var userTracks = "";
    var that = this;
    if (this.state.tracks.length === 0) {
      userTracks = [<li className="library-blurb">
        It looks like your library is empty. Click on the explore
        button in the header to discover what BetterSounds has to offer.
      </li>,
      <li className="library-blurb">
        There is also a drop down in the header with an option to add
        your own audio.
      </li>]
    } else if (this.state.tracks !== "") {
      userTracks = this.state.tracks.map(function(track) {
        return <li className="track-index-item" key={track.id}>
          <TrackIndexItem track={track} userId={track.user_id} />
        </li>;
      });
    }

    return(
      <div className="track-index">
        <ul>{userTracks}</ul>
      </div>
    );
  }
});

module.exports = UserLibrary;
