var React = require('react');

var History = require('react-router').History;
var CurrentModalStore = require('../stores/modal');
var CurrentUserStore = require('../stores/currentUser');
var ErrorStore = require('../stores/error');

var SessionsApiUtil = require('../util/sessions_api_util');
var ModalUtil = require('../util/modal_util');
var SignIn = require('./signIn');
var SignUp = require('./signUp');
var TrackForm = require('./track/trackForm');
var EditUserForm = require('./user/editUserForm');
var ErrorDisplay = require('./errorDisplay');


var siteHeader = React.createClass({
  mixins: [History],

  toSignIn: function (e) {
    e.preventDefault();
    var modal = "sign in";
    ModalUtil.setCurrentModal(modal);
  },

  toSignUp: function (e) {
    e.preventDefault();
    var modal = "sign up";
    ModalUtil.setCurrentModal(modal);
  },

  toSignOut: function (e) {
    e.preventDefault();
    SessionsApiUtil.logUserOut(function () {
       this.history.pushState({}, "welcome");
     }.bind(this));
  },

  toAddTrack: function (e) {
    e.preventDefault();
    var modal = "add track";
    ModalUtil.setCurrentModal(modal);
  },

  toEditProfile: function (e) {
    e.preventDefault();
    var modal = "edit user";
    ModalUtil.setCurrentModal(modal);
  },

  toggleDropdown: function (e) {
    e.preventDefault();
    if (this.state.dropdownClicked === false) {
      this.setState({dropdownClicked: true});
    } else {
      this.setState({dropdownClicked: false});
    }
  },

  _onChange: function () {
    this.setState({currentUser: CurrentUserStore.currentUser(),
      modal: CurrentModalStore.currentModal(),
      errors: ErrorStore.all()} );
  },

  getInitialState: function () {
    return {
      currentUser: CurrentUserStore.currentUser(),
      modal: CurrentModalStore.currentModal(),
      dropdownClicked: false,
      errors: ErrorStore.all()
    };
  },

  componentDidMount: function () {
    this.currentModalListener = CurrentModalStore.addListener(this._onChange);
    this.currentUserListener = CurrentUserStore.addListener(this._onChange);
    this.errorListener = ErrorStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.currentModalListener.remove();
    this.currentUserListener.remove();
    this.errorListener.remove();
  },

  getCurrentModal: function () {
    if (this.state.modal === "sign up") {
      return <SignUp />;
    } else if (this.state.modal === "sign in") {
      return <SignIn />;
    } else if (this.state.modal === "add track") {
      return <TrackForm user={this.state.currentUser} />;
    } else if (this.state.modal === "edit user") {
      return <EditUserForm user={this.state.currentUser} />;
    }
  },

  showDropdown: function () {
    return (
      <ul className="dropdown">
        <li className="dropdown-li" type="submit" onClick={this.toAddTrack}>
          Add Track
        </li>
        <li className="dropdown-li" type="submit" onClick={this.toEditProfile}>
          Edit Profile
        </li>
        <li className="dropdown-li" type="submit" onClick={this.toSignOut}>
          Sign out
        </li>
      </ul>
    );
  },

  headerButtons: function () {
    var dropdown = "";
    var className;

    if (this.state.dropdownClicked === true) {
      dropdown = this.showDropdown();
      className = "header-list-active";
    } else {
      className = "header-list";
    }

    if (CurrentUserStore.isLoggedIn()) {
      return (
        <div className={className} onClick={this.toggleDropdown}>
          <div>
            <img className="header-image" src={this.state.currentUser.image_url} />
          </div>
          <div id="header-user-id">{this.state.currentUser.username}</div>
          {dropdown}
        </div>

      );
    } else {
      return (<ul className="header-list">
        <li>
          <button className="sign-in-button" type="submit" onClick={this.toSignIn}>
            Sign in
          </button>
        </li>
        <li>
          <button className="sign-button" type="submit" onClick={this.toSignUp}>
            Create account
          </button>
        </li>
      </ul>
    );
    }
  },

  closeNav: function () {
    if (this.state.dropdownClicked === true) {
      this.setState({dropdownClicked: false});
    }
  },

  render: function () {
    var display;
    var buttons;
    var background = "header-nav group";
    var logo = "header-logo welcome";

    if (this.state.errors && this.state.errors.length > 0) {
      display = <ErrorDisplay errors={this.state.errors} />;
    } else if (this.state.modal === null) {
      display = "";
    } else {
      display = this.getCurrentModal();
    }

    buttons = this.headerButtons();

    if (CurrentUserStore.isLoggedIn()) {
      background = "header-nav group background";
      logo = "header-logo";
    }

    return (
      <div onClick={this.closeNav}>
        <header className="header">
          <nav className={background}>

          <h1 className={logo}>
            <a href="#"><i className="fa fa-volume-up">  BetterSounds</i></a>
          </h1>

          {buttons}

          </nav>
        </header>
        {display}
      </div>
    );
  }
});

module.exports = siteHeader;
