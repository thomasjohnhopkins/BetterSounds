var React = require('react');
var ApiUtil = require('../../util/api_util');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var CommentStore = require('../../stores/comment');
var CurrentUserStore = require('../../stores/currentUser');

var TrackComments = React.createClass({
  mixins: [LinkedStateMixin, History],

  _onChange: function () {

  },

  getInitialState: function () {
    return { track: this.props.track,
      comment: "",
      user: CurrentUserStore.currentUser()
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
    return (
      <div>
        <form className="form-session group" onSubmit={this.addComment}>
          <label>Leave a comment</label>
          <input type="text"
            valueLink={this.linkState("comment")} />
          <button type="submit" className="add-comment">
            Post
          </button>
        </form>
      </div>
    );
  }
});

module.exports = TrackComments;
