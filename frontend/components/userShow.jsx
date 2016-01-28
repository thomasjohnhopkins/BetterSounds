var React = require('react');
var History = require('react-router').History;
var apiUtils = require('../util/api_util');
var UserStore = require('../stores/currentUser');
var ModalStore = require('../stores/modal');
var TrackIndex = require('./trackIndex');
var ModalUtil = require('../util/modal_util');
var TrackForm = require('./trackForm');

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
    return { user: UserStore.currentUser(), modal: ModalStore.currentModal() };
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

  toAddTrack: function (e) {
    e.preventDefault();
    var modal = "add track";
    ModalUtil.setCurrentModal(modal);
  },

  getCurrentModal: function () {
    if (this.state.modal === "add track") {
      return <TrackForm user={this.state.user} />;
    }
  },

  render: function () {
    var display;
    var image = "";

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
        <div className="user-info">
          <h2>{this.state.user.username}</h2>
          <h5>{this.state.user.description}</h5>
            <button className="add-track" type="submit" onClick={this.toAddTrack}>
              Add Track
            </button>
          {image}
          {display}
        </div>
      </div>
    );
  }
});

module.exports = UserShow;
