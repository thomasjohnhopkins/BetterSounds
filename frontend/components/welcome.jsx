var React = require('react');
var History = require('react-router').History;

var Welcome = React.createClass({
  mixins: [History],

  render: function () {
    return(
      <div>
        <p>Welcome to Better Sounds!</p>
      </div>
    );
  }
});

module.exports = Welcome;
