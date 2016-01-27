var React = require('react');
var ApiUtil = require('../util/api_util');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var LogIn = React.createClass({
  mixins: [LinkedStateMixin, History],


 getInitialState: function () {
   return ({username: '', email: '', password: '', description: ''});
 },

 SignUp: function (e) {
   e.preventDefault();

   var user = {};

   user.username = this.state.username;
   user.email = this.state.email;
   user.password = this.state.password;
   user.description = this.state.description;

   ApiUtil.SignUserUp(user);
 },

 closeForm: function (e) {
   e.preventDefault();
 },

 render: function () {
  return(
    <div>
      <div className='overlay'></div>
      <div className='modal'>
      <p>Plenty of Tracks Await.</p>
      <p>A Forum to Share Your Own Music.</p>
      <p>Discover what BetterSounds Has to Offer by Signing Up Below.</p>
        <form className="form-session group" onSubmit={this.SignUp}>
          <label>Username</label>
          <input type="text"
            valueLink={this.linkState("username")} />

          <label>Email</label>
          <input type="text"
            valueLink={this.linkState("email")} />

          <label>Password</label>
            <input type="password"
              valueLink={this.linkState("password")} />

          <label>Describe Yourself</label>
          <input type="text"
            valueLink={this.linkState("description")} />

          <button className="cancel" onClick={this.closeForm}>Cancel</button>
          <button className="sign-button" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
    );
  }
});

module.exports = LogIn;
