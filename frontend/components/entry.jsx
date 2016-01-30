var React = require('react');
var History = require('react-router').History;
var SiteHeader = require('./siteHeader');
var Welcome = require('./welcome');



var Entry = React.createClass({

  render: function () {

    return(
      <div>
        <Welcome />
      </div>
    );
  }
});

module.exports = Entry;
