var React = require('react');
var History = require('react-router').History;
var TrackIndex = require('./track/trackIndex');
var UserShow = require('./userShow');
var SiteHeader = require('./siteHeader');

var Home = React.createClass({
  mixins: [History],
  getInitialState: function () {
    return {loggedIn: true};
  },

  render: function () {

    return(
      <div>
        <SiteHeader loggedIn={this.state.loggedIn}/>
        <UserShow />
        <TrackIndex />
      </div>
    );
  }
});

module.exports = Home;
