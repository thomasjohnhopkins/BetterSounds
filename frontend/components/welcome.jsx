var React = require('react');
var History = require('react-router').History;
var WelcomeIndex = require('./track/WelcomeIndex');

var Welcome = React.createClass({
  mixins: [History],

  render: function () {
    return(
      <div>
        <p className="welcome-text">Hear what’s currently trending on BetterSounds</p>
        <WelcomeIndex />
      </div>
    );
  }
});

module.exports = Welcome;
