var React = require('react');
var ApiUtil = require('../../util/api_util');
var History = require('react-router').History;
var TrackStore = require('../../stores/track');
var AudioPlayerActions = require('../../actions/audio_player_actions');
var UserStore = require('../../stores/user');
var UserShow = require('./userShow');
var TrackIndex = require('../track/trackIndex');
var UserDetails = require('./userDetails');

var UserPage = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    return { user: UserStore.findUser(parseInt(this.props.params.userId)) };
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
          <TrackIndex />
          <UserDetails user={this.state.user} />
        </div>
      </div>
    );
  }
});

module.exports = UserPage;
