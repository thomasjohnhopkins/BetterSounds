var React = require('react');
var History = require('react-router').History;
var apiUtils = require('../../util/api_util');
var CurrentUserStore = require('../../stores/currentUser');
var UserStore = require('../../stores/user');
var ModalStore = require('../../stores/modal');
var TrackIndex = require('./../track/trackIndex');
var ModalUtil = require('../../util/modal_util');
var TrackForm = require('./../track/trackForm');

var UserShow = React.createClass({
  mixins: [History],

  // componentWillReceiveProps: function (newProps) {
  //   ApiUtil.fetchCurrentUser(parseInt(newProps.params.userId));
  // },
  //
  // componentDidMount: function () {
  //   this.currentUserListener = UserStore.addListener(this._onChange);
  //   ApiUtil.fetchCurrentUser(parseInt(this.props.params.userId));
  // },

  getStateFromStore: function () {
    var location = window.location.hash;
    var locationArray = location.split("/");
    var toShow;
    if (locationArray[1] === "user") {
      toShow = UserStore.findUser(parseInt(locationArray[2].substring(0, 1)));
    } else {
      toShow = UserStore.findUser(parseInt(CurrentUserStore.currentUser().id));
    }

    return { user: toShow, modal: ModalStore.currentModal() };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    this.currentUserListener = UserStore.addListener(this._onChange);
    this.currentModalListener = ModalStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.currentUserListener.remove();
    this.currentModalListener.remove();
  },

  getCurrentModal: function () {

  },

  render: function () {
    var display;
    var image = "";

    if (this.state.user === undefined) {
      return <div></div>;
    }

    if (this.state.modal === null) {
      display = "";
    } else {
      display = this.getCurrentModal();
    }

    if (this.state.user.image_url) {
      image = <img
        className="post-image"
        src={this.state.user.image_url} />;
    }

    return(
      <div>
        <div className="user-banner group">
          {image}
          <div className="user-info">
            <h2 className="user-text">{this.state.user.username}</h2>
            <h5 className="user-text">{this.state.user.description}</h5>
          </div>
          {display}
        </div>
      </div>
    );
  }
});

module.exports = UserShow;
