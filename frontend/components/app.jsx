var React = require('react');
var SessionsApiUtil = require('../util/sessions_api_util');
var CurrentUserStore = require('../stores/currentUser');
var SiteHeader = require('./siteHeader');
var AudioPlayer = require('./audioPlayer');
var Display = require('./audio_display/display');

var App = React.createClass({

  componentDidMount: function () {
    CurrentUserStore.addListener(this.forceUpdate.bind(this));

    SessionsApiUtil.fetchCurrentUser();
  },

  render: function () {
    var errors = "";

    return(
      <div>
        <div className="wrapper">
          <SiteHeader />
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
