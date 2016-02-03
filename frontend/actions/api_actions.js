var AppDispatcher = require('../dispatcher/app_dispatcher.js');
var SessionConstants = require('../constants/session_constants');
var UserConstants = require('../constants/user_constants');
var TrackConstants = require('../constants/track_constants');
var CommentConstants = require('../constants/comment_constants');
var UserFollowConstants = require('../constants/user_follow_constants');
var UserLikeConstants = require('../constants/user_like_constants');

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
  },

  addUserFollow: function (userFollow) {
    AppDispatcher.dispatch({
      actionType: UserFollowConstants.ADD_USER_FOLLOW,
      userFollow: userFollow
    });
  },

  removeUserFollow: function (userFollow) {
    AppDispatcher.dispatch({
      actionType: UserFollowConstants.REMOVE_USER_FOLLOW,
      userFollow: userFollow
    });
  },

  resetUserFollows: function (userFollows) {
    AppDispatcher.dispatch({
      actionType: UserFollowConstants.RESET_USER_FOLLOWS,
      userFollows: userFollows
    });
  },

  addUserLike: function (userLike) {
    AppDispatcher.dispatch({
      actionType: UserLikeConstants.ADD_USER_LIKE,
      userLike: userLike
    });
  },

  removeUserLike: function (userLike) {
    AppDispatcher.dispatch({
      actionType: UserLikeConstants.REMOVE_USER_LIKE,
      userLike: userLike
    });
  },

  resetUserLikes: function (userLikes) {
    AppDispatcher.dispatch({
      actionType: UserLikeConstants.RESET_USER_LIKES,
      userLikes: userLikes
    });
  }
};

module.exports = ApiActions;
