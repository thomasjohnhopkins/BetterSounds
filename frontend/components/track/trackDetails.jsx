var React = require('react');
var TrackStore = require('../../stores/track');
var ApiUtil = require('../../util/api_util');
var UserStore = require('../../stores/user');

var TrackDetails = React.createClass({

  getTrackId: function () {
    var hashString = window.location.hash;
    var splitString = hashString.split("?");
    return splitString[0].substring(8, splitString[0].length);
  },

  _onChange: function () {
    var track_id = parseInt(this.getTrackId());
    var track = TrackStore.find(track_id);

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

  render: function () {

    if (this.state.poster === "") {
      return <div></div>;
    } else if (this.state.poster === undefined) {
      return <div></div>;
    }
    
    return (
      <ul className="track-details">
        <li className="track-detail">
          Uploaded by: {this.state.poster.username}
        </li>
      </ul>
    );
  }
});

module.exports = TrackDetails;
