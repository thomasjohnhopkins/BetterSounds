var React = require('react');
var History = require('react-router').History;
var TrackIndex = require('./track/trackIndex');
var UserShow = require('./user/userShow');
var UserStore = require('../stores/currentUser');
var UserDeatils = require('./user/userDetails');


var Home = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    return { user: UserStore.currentUser() };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.currentUserListener = UserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.currentUserListener.remove();
  },

  render: function () {

    return(
      <div>
        <UserShow />
        <div className="group">
          <h2 className="track-index-header">Collection</h2>
          <TrackIndex />
          <UserDeatils user={this.state.user} />
        </div>
    </div>
    );
  }
});

module.exports = Home;
