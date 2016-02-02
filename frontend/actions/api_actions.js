var AppDispatcher = require('../dispatcher/app_dispatcher.js');
var SessionConstants = require('../constants/session_constants');
var UserConstants = require('../constants/user_constants');
var TrackConstants = require('../constants/track_constants');
var CommentConstants = require('../constants/comment_constants');

ApiActions = {
  logInUser: function (user) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.USER_CONFIRMED,
      user: user
    });
  },

  updateUser: function (user) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.USER_CONFIRMED,
      currentUser: user
    });
  },

  signUpUser: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.NEW_USER,
      user: user
    });
  },

  sendUsers: function (users) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RESET_USERS,
      users: users
    });
  },

  sendAllTracks: function (tracks) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACKS_RECEIVED,
      tracks: tracks
    });
  },

  uploadTrack: function (track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACK_ADDED,
      track: track
    });
  },

  sendTrack: function (track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.SEND_TRACK,
      track: track
    });
  },

  postComment: function (comment) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.POST_COMMENT,
      comment: comment
    });
  },

  setComments: function (comments) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.RESET_COMMENTS,
      comments: comments
    });
  }
};

module.exports = ApiActions;
