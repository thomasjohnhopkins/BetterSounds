var React = require('react');
var History = require('react-router').History;

var siteHeader = React.createClass({
  mixins: [History],

  toSignIn: function (e) {
    e.preventDefault();
    this.history.pushState(null, "/sign-in/");
  },

  toSignUp: function (e) {
    e.preventDefault();
    this.history.pushState(null, "/sign-up/");
  },

  render: function () {
    return (
      <header className="header">
        <nav className="header-nav group">

          <h1 className="header-logo">
            <a href="#">BetterSounds</a>
          </h1>

          <ul className="header-list">
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

        </nav>
      </header>
    );
  }
});

module.exports = siteHeader;
