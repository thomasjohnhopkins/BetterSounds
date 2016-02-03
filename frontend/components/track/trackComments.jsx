var React = require('react');
var ApiUtil = require('../../util/api_util');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var CommentStore = require('../../stores/comment');
var CurrentUserStore = require('../../stores/currentUser');
var UserStore = require('../../stores/user');
var TrackStore = require('../../stores/track');
var UserFollowStore = require('../../stores/userFollow');
var UserLikeStore = require('../../stores/userLike');

var TrackComments = React.createClass({
  mixins: [LinkedStateMixin, History],

  getTrackId: function () {
    var hashString = window.location.hash;
    var splitString = hashString.split("?");
    return splitString[0].substring(8, splitString[0].length);
  },

  _onChange: function () {
    var track_id = parseInt(this.getTrackId());
    this.setState({
      comments: CommentStore.findComments(track_id),
      user: CurrentUserStore.currentUser(),
      track: TrackStore.find(track_id),
      followed: this.userFollowsTrack(),
      liked: this.userLikesTrack()
    });
  },

  getInitialState: function () {
    var track_id = parseInt(this.getTrackId());
    return { track: TrackStore.find(track_id),
      comment: "",
      user: CurrentUserStore.currentUser(),
      comments: CommentStore.findComments(this.getTrackId()),
      followed: this.userFollowsTrack(),
      liked: this.userLikesTrack()
    };
  },

  componentDidMount: function () {
    this.commentListener = CommentStore.addListener(this._onChange);
    this.trackListener = TrackStore.addListener(this._onChange);
    this.userFollowListener = UserFollowStore.addListener(this._onChange);
    this.userLikeListener = UserLikeStore.addListener(this._onChange);
    var trackId = parseInt(this.getTrackId());
    ApiUtil.fetchComments();
    ApiUtil.fetchUsers();
    ApiUtil.fetchAllTracks();
    ApiUtil.fetchUserFollows();
    ApiUtil.fetchUserLikes();
  },

  componentWillUnmount: function () {
    this.commentListener.remove();
    this.trackListener.remove();
    this.userFollowListener.remove();
    this.userLikeListener.remove();
  },

  addComment: function (e) {
    e.preventDefault();

    var formData = new FormData();

    formData.append("comment[body]", this.state.comment);
    formData.append("comment[user_id]", this.state.user.id);
    formData.append("comment[track_id]", this.state.track.id);

    ApiUtil.postComment(formData, this.state.track.id);

    this.resetForm();
  },

  resetForm: function() {
    this.setState({comment: ""});
  },

  userFollowsTrack: function () {
    var user = CurrentUserStore.currentUser();
    var userFollows = UserFollowStore.allUserFollows();

    for (var i = 0; i < userFollows.length; i++) {
      if (userFollows[i].track_id === this.props.track.id && userFollows[i].user_id === user.id) {
        return userFollows[i];
      }
    }
    return false;
  },

  userLikesTrack: function () {
    var user = CurrentUserStore.currentUser();
    var userLikes = UserLikeStore.allUserLikes();

    for (var i = 0; i < userLikes.length; i++) {
      if (userLikes[i].track_id === this.props.track.id && userLikes[i].user_id === user.id) {
        return userLikes[i];
      }
    }
    return false;
  },

  toggleFollowTrack: function () {
    var user_id = CurrentUserStore.currentUser().id;
    var track_id = this.state.track.id;

    if (this.userFollowsTrack()) {
      ApiUtil.unfollowTrack(this.userFollowsTrack().id);
    } else {
      var formData = new FormData();

      formData.append("user_follow[track_id]", track_id);
      formData.append("user_follow[user_id]", user_id);

      ApiUtil.followTrack(formData);
    }
  },

  toggleLikeTrack: function () {
    var user_id = CurrentUserStore.currentUser().id;
    var track_id = this.state.track.id;
    
    if (this.userLikesTrack()) {
      ApiUtil.unlikeTrack(this.userLikesTrack().id);
    } else {
      var formData = new FormData();

      formData.append("user_like[track_id]", track_id);
      formData.append("user_like[user_id]", user_id);

      ApiUtil.likeTrack(formData);
    }
  },

  render: function () {
    var indexedComments = [];
    var trackComments = this.state.comments;

    if (trackComments.length === 0) {
      indexedComments = <div></div>;
    }

    for (var i = (trackComments.length - 1); i >= 0; i--) {
      var content = trackComments[i].body;
      var author = UserStore.findUser(trackComments[i].user_id);
      if (author === undefined) {
        return <div></div>;
      }
      indexedComments.push(<li className="comment-item group" key={trackComments[i].id}>
        <span className="comment-content">{content}</span>
        <ul className="commenter-details">
          <li>
            <img className="comment-image" src={author.image_url} />
          </li>
          <li className="author-tag">
            posted by: {author.username}
          </li>
        </ul>
      </li>);
    }

    var commentNumber;
    if (this.state.comments.length === 1) {
      commentNumber = "1 Comment";
    } else {
      commentNumber = this.state.comments.length + " Comments";
    }

    var followIconClass;
    if (this.userFollowsTrack()) {
      followIconClass = "fa fa-retweet rt-comment followed";
    } else {
      followIconClass = "fa fa-retweet rt-comment";
    }

    var likeIconClass;
    if (this.userLikesTrack()) {
      likeIconClass = "fa fa-heart h-comment liked";
    } else {
      likeIconClass = "fa fa-heart h-comment";
    }

    return (
      <div>
        <form className="comemnt-form group" onSubmit={this.addComment}>
          <input type="text"
            className="comment-input"
            placeholder="Leave a comment..."
            valueLink={this.linkState("comment")} />
          <button type="submit" className="add-comment">
            Post
          </button>
        </form>
        <ul className="track-actions">
            <li className="track-show-icons" onClick={this.toggleFollowTrack}>
              <i className={followIconClass}>Follow</i>
            </li>
            <li className="track-show-icons" onClick={this.toggleLikeTrack}>
              <i className={likeIconClass}>Like</i>
            </li>
        </ul>
        <div className="comment-index">
          <h5 className="comment-index-header">
            <i className="fa fa-comment"></i>{commentNumber}
          </h5>
          <ul className="comment-list">{indexedComments}</ul>
        </div>
      </div>
    );
  }
});

module.exports = TrackComments;
