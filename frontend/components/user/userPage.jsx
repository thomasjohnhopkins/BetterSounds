var React = require('react');
var ApiUtil = require('../../util/api_util');
var History = require('react-router').History;
var TrackStore = require('../../stores/track');
var AudioPlayerActions = require('../../actions/audio_player_actions');
var UserStore = require('../../stores/user');
var UserShow = require('./userShow');
var UserLibrary = require('./userLibrary');
var UserDetails = require('./userDetails');

var UserPage = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    var location = window.location.hash;
    var locationArray = location.split("/");
    var toShow;
    if (locationArray[1] === "user") {
      toShow = UserStore.findUser(parseInt(locationArray[2].substring(0, 1)));
    } else {
      toShow = UserStore.findUser(parseInt(CurrentUserStore.currentUser().id));
    }

    return { user: toShow };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.trackListener = TrackStore.addListener(this._onChange);
    this.UserListener = UserStore.addListener(this._onChange);
    ApiUtil.fetchAllTracks();
    ApiUtil.fetchUsers();
  },

  componentWillUnmount: function () {
    this.trackListener.remove();
    this.UserListener.remove();
  },

  render: function () {
    if (this.state.user === undefined) { return <div></div>; }

    return (
      <div>
        <UserShow />
        <div className="index-info-contatiner group">
          <h2 className="track-index-header">Collection</h2>
          <UserLibrary user={this.state.user} />
          <UserDetails user={this.state.user} />
        </div>
      </div>
    );
  }
});

module.exports = UserPage;
