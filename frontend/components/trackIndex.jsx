var React = require('react');
var History = require('react-router').History;
var TrackStore = require('../stores/track');

var TrackIndex = React.createClass({
  mixins: [History],

  getIntialState: function () {
    return { tracks: TrackStore.all() };
  },

  _onChange: function () {
    this.setState({ tracks: TrackStore.all() });
  },

  componentDidMount: function () {
    this.listenerToken = TrackStore.addListener(this._onChange);
     apiUtils.fetchAllTracks();
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

// until track audio uploaded, I am just rendering info for each track

  render: function () {
    var allTracks = this.state.tracks.map(function(track) {
        return <li className="track-index-item" key={track.id}>
          {track.title} : {track.artist}
        </li>;
      }
    );

    return(
      <div className="track-index">
        <ul>{allTracks}</ul>
      </div>
    );
  }
});

module.exports = TrackIndex;
