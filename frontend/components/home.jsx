var React = require('react');
var History = require('react-router').History;
var SiteHeader = require('./siteHeader');
var Welcome = require('./welcome');



var Home = React.createClass({

  render: function () {

    return(
      <div>
        <SiteHeader />
        <Welcome />
      </div>
    );
  }
});

module.exports = Home;
