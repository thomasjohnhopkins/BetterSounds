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
    var text;

    if (this.props.isPlaying) {
      text = "pause";
    } else {
      text = "play";
    }

    return (
      <div className="controller-button">
        <a onClick={ this._togglePlayPause }>
          <div>{text}</div>
        </a>
      </div>
    );
  }
});

module.exports = PlayButton;
