var React = require('react');

var Welcome = React.createClas({
  toSignIn: function () {

  },

  toSignUp: function () {

  },

  render: function () {
    return(
      <div>
        <button className="sign-button" type="submit">
          Sign In
        </button>
        <button className="sign-button" type="submit" onSubmit="">
          Sign Up
        </button>
      </div>
    );
  }
});

module.exports = Welcome;
