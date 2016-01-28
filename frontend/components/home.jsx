var React = require('react');
var History = require('react-router').History;
var TrackIndex = require('./trackIndex');
var UserShow = require('./userShow');
var SiteHeader = require('./siteHeader');

var Home = React.createClass({
  mixins: [History],

  render: function () {
    return(
      <div>
        <SiteHeader />
        <p>Welcome Back Better Sounds!</p>
        <UserShow />
        <TrackIndex />
      </div>
    );
  }
});

module.exports = Home;
