var React = require('react');
var ApiUtil = require('../../util/api_util');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var CommentStore = require('../../stores/comment');
var CurrentUserStore = require('../../stores/currentUser');

var TrackComments = React.createClass({
  mixins: [LinkedStateMixin, History],

  _onChange: function () {
    var track_id = this.state.track.id;
    this.setState({comments: CommentStore.findComments(track_id)});
  },

  getInitialState: function () {
    return { track: this.props.track,
      comment: "",
      user: CurrentUserStore.currentUser(),
      comments: CommentStore.findComments(this.props.track.id)
    };
  },

  componentDidMount: function () {
    this.commentListener = CommentStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.commentListener.remove();
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

  render: function () {

    var comments = this.state.comments.map( function (comment) {
        var content = comment.body;
        return <li className="comment-item" key={comment.id}>
          {content}
        </li>;
    });

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
          <ul className="comment-list">{comments}</ul>
        </div>
      </div>
    );
  }
});

module.exports = TrackComments;
