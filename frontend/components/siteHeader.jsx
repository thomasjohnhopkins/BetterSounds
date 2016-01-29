var React = require('react');

var History = require('react-router').History;
var CurrentModalStore = require('../stores/modal');
var CurrentUserStore = require('../stores/currentUser');

var SessionsApiUtil = require('../util/sessions_api_util');
var ModalUtil = require('../util/modal_util');
var SignIn = require('./signIn');
var SignUp = require('./signUp');


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

  _onChange: function () {
    this.setState({currentUser: CurrentUserStore.currentUser(),
      modal: CurrentModalStore.currentModal()} );
  },

  getInitialState: function () {
    return {
      currentUser: {}, modal: CurrentModalStore.currentModal()
    };
  },

  componentDidMount: function () {
    this.currentModalListener = CurrentModalStore.addListener(this._onChange);
    this.currentUserListener = CurrentUserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.currentModalListener.remove();
    this.currentUserListener.remove();
  },

  getCurrentModal: function () {
    if (this.state.modal === "sign up") {
      return <SignUp />;
    } else if (this.state.modal === "sign in") {
      return <SignIn />;
    }
  },

  welcomeButtons: function () {

    if (CurrentUserStore.isLoggedIn()) {
      return (
        <ul className="header-list">
          <li>
            <img className="header-image" src={this.state.currentUser.image_url} />
          </li>
          <li id="header-user-id">{this.state.currentUser.username}</li>
          <li>
            <button className="sign-button" type="submit" onClick={this.toSignOut}>
              Sign out
            </button>
          </li>
        </ul>
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

  render: function () {
    var display;
    var buttons;
    var background = "header-nav group";

    if (this.state.modal === null) {
      display = "";
    } else {
      display = this.getCurrentModal();
    }

    buttons = this.welcomeButtons();

    if (CurrentUserStore.isLoggedIn()) {
      background = "header-nav group background";
    }

    return (
      <div>
        <header className="header">
          <nav className={background}>

            <h1 className="header-logo">
              <a href="#">BetterSounds</a>
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
