var AppDispatcher = require('../dispatcher/app_dispatcher.js');
var SessionConstants = require('../constants/session_constants');
var UserConstants = require('../constants/user_constants');
var TrackConstants = require('../constants/track_constants');

ApiActions = {
  logInUser: function (user) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.USER_CONFIRMED,
      user: user
    });
  },

  signUpUser: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.NEW_USER,
      user: user
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
  }
};

module.exports = ApiActions;
