var React = require('react');
var SessionsApiUtil = require('../util/sessions_api_util');
var CurrentUserStore = require('../stores/currentUser');
var SiteHeader = require('./siteHeader');
var AudioPlayer = require('./audioPlayer');
var Display = require('./audio_display/display');
var ErrorDisplay = require('./ErrorDisplay');

var App = React.createClass({

  componentDidMount: function () {
    CurrentUserStore.addListener(this.forceUpdate.bind(this));

    SessionsApiUtil.fetchCurrentUser();
  },

  render: function () {

    return(
      <div>
        <div className="wrapper">
          <SiteHeader />
          <ErrorDisplay />
          {this.props.children}
          <div className="push"></div>
        </div>
        <div className="footer">
          <Display />
          <AudioPlayer />
        </div>
      </div>
    );
  }
});

module.exports = App;
