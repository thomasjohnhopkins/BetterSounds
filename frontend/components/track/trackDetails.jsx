var React = require('react');
var TrackStore = require('../../stores/track');
var ApiUtil = require('../../util/api_util');
var UserStore = require('../../stores/user');
var History = require('react-router').History;

var TrackDetails = React.createClass({
  mixins: [History],

  getTrackId: function () {
    var hashString = window.location.hash;
    var splitString = hashString.split("?");
    return splitString[0].substring(8, splitString[0].length);
  },

  _onChange: function () {
    var track_id = parseInt(this.getTrackId());
    var track = TrackStore.find(track_id);
    if (track === undefined) {
      return;
    }
    this.setState({poster: UserStore.findUser(track.user_id)});
  },

  getInitialState: function () {
    var track_id = parseInt(this.getTrackId());
    return { poster: "" };
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._onChange);
    this.trackListener = TrackStore.addListener(this._onChange);
    ApiUtil.fetchUsers();
    ApiUtil.fetchAllTracks();
  },

  componentWillUnmount: function () {
    this.userListener.remove();
    this.trackListener.remove();
  },

  showUser: function (e) {
    e.preventDefault();
    this.history.pushState(null, '/user/' + this.state.poster.id, {});
  },

  render: function () {

    if (this.state.poster === "") {
      return <div></div>;
    } else if (this.state.poster === undefined) {
      return <div></div>;
    }

    return (
      <ul className="track-details">
        <li className="track-uploader" onClick={this.showUser}>
          Uploaded by: {this.state.poster.username}
        </li>
      </ul>
    );
  }
});

module.exports = TrackDetails;
