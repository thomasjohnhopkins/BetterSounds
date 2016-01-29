var React = require('react');
var SessionsApiUtil = require('../util/sessions_api_util');
var CurrentUserStore = require('../stores/currentUser');

var App = React.createClass({

  componentDidMount: function () {
    CurrentUserStore.addListener(this.forceUpdate.bind(this));

    SessionsApiUtil.fetchCurrentUser();
  },

  render: function () {
  
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
