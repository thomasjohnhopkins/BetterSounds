var React = require('react');
var ApiUtil = require('../util/api_util');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ModalUtil = require('../util/modal_util');

var LogIn = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return ({email: '', password: ''});
  },

 logIn: function (e) {
   e.preventDefault();

   var user = {};

   user.email = this.state.email;
   user.password = this.state.password;

   ApiUtil.logUserIn(user);

   this.history.pushState(null, "/current-user");
 },

 closeForm: function (e) {
  e.preventDefault();
  ModalUtil.removeCurrentModal();
 },

 render: function () {
  return(
    <div>
    <div className='overlay' onClick={this.closeForm}></div>
      <div className="modal">
        <p>Welcome Back. Continue to discover new music by signing in below.</p>
          <form className="form-session group" onSubmit={this.logIn}>
            <label>Email</label>
            <input type="text"
              valueLink={this.linkState("email")} />

            <label>Password</label>
              <input type="password"
                valueLink={this.linkState("password")} />

            <ul className="form-buttons group">
              <li className="cancel" onClick={this.closeForm}>Cancel</li>
              <li><button className="sign-button" type="submit">Sign In</button></li>
            </ul>
          </form>
      </div>
    </div>
    );
  }
});

module.exports = LogIn;
