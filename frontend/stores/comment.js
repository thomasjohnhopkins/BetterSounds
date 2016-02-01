var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var CommentConstants = require('../constants/comment_constants');

var _comments = [];

var CommentStore = new Store(AppDispatcher);

var addComment = function (comment) {
  _comments.push(comment);
  CommentStore.__emitChange();
};

var resetComments = function (comments) {
  _comments = comments;
  CommentStore.__emitChange();
};

CommentStore.findComments = function (id) {
  var currentComments = [];

  _comments.forEach( function (comment) {
    if (comment.track_id === id) {
      currentComments.push(comment);
    }
  });
  return currentComments;
};

CommentStore.__onDispatch = function (payload) {
switch(payload.actionType) {
  case CommentConstants.POST_COMMENT:
    addComment(payload.comment);
    break;
  case CommentConstants.RESET_COMMENTS:
    resetComments(payload.comments);
    break;
  }
};

module.exports = CommentStore;
