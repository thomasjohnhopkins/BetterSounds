var React = require('react');

var ErrorStore = require('../stores/error');

var ErrorDisplay = React.createClass({

  getIntialState: function () {
    return { errors: ErrorStore.all() };
  },

  _onChange: function () {
    this.setState({ errors: ErrorStore.all() });
  },

  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.errorListener.remove();
  },

  render: function () {
    if (this.state === null) {
      return <div></div>;
    }

    var currentErrors = this.state.errors[0];
     
    return (
        <div className="error-item">{currentErrors}</div>
    );
  }

});

module.exports = ErrorDisplay;
