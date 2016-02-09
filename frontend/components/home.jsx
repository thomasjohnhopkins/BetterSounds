var React = require('react');
var History = require('react-router').History;

var UserShow = require('./user/userShow');
var CurrentUserStore = require('../stores/currentUser');
var UserStore = require('../stores/user');
var TrackStore = require('../stores/track');
var UserDeatils = require('./user/userDetails');
var UserLibrary = require('./user/userLibrary');
var ApiUtil = require('../util/api_util');


var Home = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    return { user: CurrentUserStore.currentUser() };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.currentUserListener = CurrentUserStore.addListener(this._onChange);
    this.userListener = UserStore.addListener(this._onChange);
    this.trackListener = TrackStore.addListener(this._onChange);
    ApiUtil.fetchAllTracks();
    ApiUtil.fetchUsers();
  },

  componentWillUnmount: function () {
    this.userListener.remove();
    this.currentUserListener.remove();
    this.trackListener.remove();
  },

  render: function () {
    return(
      <div>
        <div className="index-info-container group">
          <h2 className="track-index-header">Your Stream</h2>
          <UserLibrary user={this.state.user} />
          <UserDeatils user={this.state.user} />
        </div>
    </div>
    );
  }
});

module.exports = Home;
