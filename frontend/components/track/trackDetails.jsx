var React = require('react');
var TrackStore = require('../../stores/track');
var ApiUtil = require('../../util/api_util');
var UserStore = require('../../stores/user');
var UserFollowStore = require('../../stores/userFollow');
var UserLikeStore = require('../../stores/userLike');
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
    this.setState({poster: UserStore.findUser(track.user_id),
    track: track});
  },

  getInitialState: function () {
    var track_id = parseInt(this.getTrackId());
    return { poster: "", track: "" };
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._onChange);
    this.trackListener = TrackStore.addListener(this._onChange);
    this.userFollowListener = UserFollowStore.addListener(this._onChange);
    this.userLikeListener = UserLikeStore.addListener(this._onChange);
    ApiUtil.fetchUsers();
    ApiUtil.fetchAllTracks();
  },

  componentWillUnmount: function () {
    this.userListener.remove();
    this.trackListener.remove();
    this.userLikeListener.remove();
    this.userFollowListener.remove();
  },

  showUser: function (e) {
    e.preventDefault();
    this.history.pushState(null, '/user/' + this.state.poster.id, {});
  },

  render: function () {

    if (this.state.poster === "" || this.state.track === "") {
      return <div></div>;
    } else if (this.state.poster === undefined || this.state.track === undefined) {
      return <div></div>;
    }
    trackTags = this.state.track.tags.map( function (tag) {
      return <li className="tag-names">{tag.name}</li>;
    });

    return (
      <div>
        <ul className="track-details">
          <li className="track-uploader" onClick={this.showUser}>
            Uploaded by: {this.state.poster.username}
          </li>
          <li>
            Play Count: {this.state.track.play_count}
          </li>
          <li>
            Follows: {UserFollowStore.getFollows(this.state.track.id).length}
          </li>
          <li>
            Likes: {UserLikeStore.getLikes(this.state.track.id).length}
          </li>
        </ul>
        <ul className="track-details">
          <li className="tag-header">Tags</li>
          {trackTags}
      </ul>
      </div>
    );
  }
});

module.exports = TrackDetails;
