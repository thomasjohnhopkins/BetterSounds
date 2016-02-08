var React = require('react');
var History = require('react-router').History;
var TrackStore = require('../../stores/track');
var apiUtils = require('../../util/api_util');
var TrackIndexItem = require('./trackIndexItem');
var UserStore = require('../../stores/user');

var TrackIndex = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { tracks: TrackStore.all() };
  },

  _onChange: function () {
    this.setState({ tracks: TrackStore.all() });
  },

  componentDidMount: function () {
    this.listenerToken = TrackStore.addListener(this._onChange);
    apiUtils.fetchAllTracks();
    apiUtils.fetchUsers();
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  shuffle: function (array) {
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
},
  setTracksToRender: function () {
    var allTracks = [];

    if (this.state !== null) {
      this.state.tracks.forEach( function (track) {

        allTracks.push(<li className="track-index-item" key={track.id}>
        <TrackIndexItem track={track} userId={track.user_id} />
      </li>);
    });
  }

  var toRender = this.shuffle(allTracks);
  toRender.splice(6);
  this.toRender = toRender;
  },



  render: function () {
    if (!this.toRender && this.state.tracks.length > 0) {

      this.setTracksToRender();
    }

    return(
      <div className="track-index">
        <ul>{this.toRender}</ul>
      </div>
    );
  }
});

module.exports = TrackIndex;
