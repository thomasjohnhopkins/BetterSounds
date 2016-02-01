var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var CommentConstants = require('../constants/comment_constants');

var _comments = [];

var CommentStore = new Store(AppDispatcher);

var addComment = function (comment) {
  debugger
  _comments.push(comment);
};

CommentStore.findComments = function (id) {
  var currentComments = [];
  _comments.forEach( function (comment) {
    if (comment.track_id === id) {
      currentComments.push(track);
    }
  });
  return currentComments;
};

CommentStore.__onDispatch = function (payload) {
switch(payload.actionType) {
  case CommentConstants.POST_COMMENT:
    addComment(payload.comment);
    CommentStore.__emitChange();
    break;
  }
};

module.exports = CommentStore;
