var React = require('react');

var ModalUtil = require('../util/modal_util');
var ErrorStore = require('../stores/error');

var ErrorDisplay = React.createClass({

  render: function () {
    if (this.props === null) {
      return <div></div>;
    }

    var currentErrors = this.props.errors[0];

    return (
        <div className="error-item">{currentErrors}</div>
    );
  }

});

module.exports = ErrorDisplay;
