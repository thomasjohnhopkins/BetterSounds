var React = require('react');
var History = require('react-router').History;
var TrackIndex = require('./track/trackIndex');
var UserShow = require('./userShow');


var Home = React.createClass({
  mixins: [History],

  render: function () {

    return(
      <div>
        <UserShow />
        <TrackIndex />
      </div>
    );
  }
});

module.exports = Home;
