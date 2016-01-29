var React = require('react');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ModalUtil = require('../util/modal_util');
var SessionsApiUtil = require('../util/sessions_api_util');

var LogIn = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return ({email: '', password: ''});
  },

 logIn: function (e) {
   e.preventDefault();
   ModalUtil.removeCurrentModal();

   var user = {};

   user.email = this.state.email;
   user.password = this.state.password;

   SessionsApiUtil.logUserIn(user, function () {
      this.history.pushState({}, "/");
    }.bind(this));
 },

 closeForm: function (e) {
  e.preventDefault();
  ModalUtil.removeCurrentModal();
 },

 render: function () {
  return(
    <div>
    <div className='overlay' onClick={this.closeForm}></div>
      <div className="top-of-page">
      <div className="modal">
        <p>Welcome Back.</p>
        <p>Continue to discover new music by signing in below.</p>
          <form className="form-session group" onSubmit={this.logIn}>
            <label>Your email address</label>
            <input type="text"
              valueLink={this.linkState("email")} />

            <label>Your password</label>
              <input type="password"
                valueLink={this.linkState("password")} />

            <ul className="form-buttons group">
              <li className="cancel-sign-in form-li" onClick={this.closeForm}>Cancel</li>
              <li className="form-li">
                <button className="sign-button" type="submit">Sign In</button>
              </li>
            </ul>
          </form>
      </div>
      </div>
    </div>
    );
  }
});

module.exports = LogIn;
