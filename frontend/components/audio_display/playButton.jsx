var React = require("react");

var PlayButton = React.createClass({
  _togglePlayPause: function () {
    if (this.props.isPlaying) {
      this.props.pauseAudio();
    } else {
      this.props.playAudio();
    }
  },

  playPause: function () {
    var text;

    if (this.props.isPlaying) {
      text = "pause";
    } else {
      text = "play";
    }

    return className;
  },

  render: function () {
    return (
      <div className="controller-button">
        <a onClick={ this._togglePlayPause }>
          <div>{this.playPause}</div>
        </a>
      </div>
    );
  }
});

module.exports = PlayButton;
