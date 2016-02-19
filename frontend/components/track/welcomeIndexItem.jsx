var React = require('react');
var History = require('react-router').History;
var AudioPlayerActions = require('../../actions/audio_player_actions');


var WelcomeIndexItem = React.createClass({
  mixins: [History],

  playTrack: function () {
    AudioPlayerActions.setTrack(this.props.track);
  },

  render: function () {
    var trackImage;

    if (this.props.track.image_url) {
      trackImage = <img
        className="welcome-image"
        src={this.props.track.image_url} />;
    }

    return (
      <div className="welcome-index-item" onClick={this.playTrack}>

        <div className="track-welcome-image">{trackImage}</div>

        <ul className="welcome-index-item-details">
          <li className="welcome-index-item-title">
            {this.props.track.title}
          </li>
          <li className="welcome-index-item-artist">{this.props.track.artist}</li>
        </ul>
      </div>
    );
  }

});

module.exports = WelcomeIndexItem;
