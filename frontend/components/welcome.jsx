var React = require('react');

var Welcome = React.createClass({
  toSignIn: function () {

  },

  toSignUp: function () {

  },

  render: function () {
    return(
      <div>
        <button className="sign-button" type="submit" onSubmit={this.toSignIn}>
          Sign In
        </button>
        <button className="sign-button" type="submit" onSubmit={this.toSignUp}>
          Sign Up
        </button>
      </div>
    );
  }
});

module.exports = Welcome;
