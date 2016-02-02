var React = require('react');
var ApiUtil = require('../../util/api_util');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var CommentStore = require('../../stores/comment');
var CurrentUserStore = require('../../stores/currentUser');
var UserStore = require('../../stores/user');
var TrackStore = require('../../stores/track');

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
      track: TrackStore.find(track_id)
    });
  },

  getInitialState: function () {
    var track_id = parseInt(this.getTrackId());
    return { track: TrackStore.find(track_id),
      comment: "",
      user: CurrentUserStore.currentUser(),
      comments: CommentStore.findComments(this.getTrackId())
    };
  },

  componentDidMount: function () {
    this.commentListener = CommentStore.addListener(this._onChange);
    this.trackListener = TrackStore.addListener(this._onChange);
    var trackId = parseInt(this.getTrackId());
    ApiUtil.fetchComments();
    ApiUtil.fetchUsers();
    ApiUtil.fetchAllTracks();
  },

  componentWillUnmount: function () {
    this.commentListener.remove();
    this.trackListener.remove();
  },

  addComment: function (e) {
    debugger
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


    var commentsLength = this.state.comments.length;

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

        <div className="comment-index">
          <h5 className="comment-index-header">{commentsLength} Comments</h5>
          <ul className="comment-list">{indexedComments}</ul>
        </div>
      </div>
    );
  }
});

module.exports = TrackComments;
