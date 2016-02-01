var React = require("react");

var PlayButton = React.createClass({
  _togglePlayPause: function () {
    if (this.props.isPlaying) {
      this.props.pauseAudio();
    } else {
      this.props.playAudio();
    }
  },

  render: function () {
    var symbol;

    if (this.props.isPlaying) {
      symbol = <i className="fa fa-pause fa-2x"></i>;
    } else {
      symbol = <i className="fa fa-play fa-2x"></i>;
    }

    return (
      <div className="controller-button">
        <a onClick={ this._togglePlayPause }>
          <div className="controls">{symbol}</div>
        </a>
      </div>
    );
  }
});

module.exports = PlayButton;
