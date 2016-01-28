var React = require('react');
var History = require('react-router').History;
var apiUtils = require('../util/api_util');
var UserStore = require('../stores/currentUser');

var UserShow = React.createClass({
  mixins: [History],

  // ==Future Direction When I have react Auth figured out
  // getStateFromStore: function () {
  //   return { user: UserStore.find(parseInt(this.props.params.userId)) };
  // },
  //
  // _onChange: function () {
  //   this.setState(this.getStateFromStore());
  // },
  //
  // getInitialState: function () {
  //   return this.getStateFromStore();
  // },
  //
  // componentWillReceiveProps: function (newProps) {
  //   ApiUtil.fetchCurrentUser(parseInt(newProps.params.userId));
  // },
  //
  // componentDidMount: function () {
  //   this.currentUserListener = UserStore.addListener(this._onChange);
  //   ApiUtil.fetchCurrentUser(parseInt(this.props.params.userId));
  // },
  //
  // componentWillUnmount: function () {
  //   this.currentUserListener.remove();
  // },

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
        <div className="user-info">
          <h2>{this.state.user.username}</h2>
          <h5>{this.state.user.description}</h5>
          <img className="post-image" src={this.state.user.image_url} />
        </div>
      </div>
    );
  }
});

module.exports = UserShow;
