var React = require('react');
var SessionsApiUtil = require('../util/sessions_api_util');
var CurrentUserStore = require('../stores/currentUser');
var SiteHeader = require('./siteHeader');
var AudioPlayer = require('./audioPlayer');

var App = React.createClass({

  componentDidMount: function () {
    CurrentUserStore.addListener(this.forceUpdate.bind(this));

    SessionsApiUtil.fetchCurrentUser();
  },

  render: function () {

    return(
      <div>
        <SiteHeader />
        <AudioPlayer />
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
