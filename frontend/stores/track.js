var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var TrackConstants = require('../constants/track_constants');

var _tracks = [];

var TrackStore = new Store(AppDispatcher);

TrackStore.all = function () {

  return _tracks.slice(0);
};

var resetTracks = function (tracks) {
  _tracks = tracks;
};

var addTrack = function (track) {
  _tracks.push(track);
};

var updateTracks = function (track) {
  for (var i = 0; i < _tracks.length; i++) {
    if (_tracks[i].id === track.id) {
      _tracks[i] = track;
    }
  }
};

var deleteTrack = function (track) {
  for (var i = 0; i < _tracks.length; i++) {
    if (_tracks[i].id === track.id) {
      _tracks.splice(i, 1);
    }
  }
};

TrackStore.find = function (id) {
  var currentTrack;
  _tracks.forEach( function (track) {
    if (track.id === id) {
      currentTrack = track;
    }
  });
  return currentTrack;
};

TrackStore.findUsersTracks = function (user) {
  var userTracks= [];
  if (user === undefined) {
    return userTracks;
  }

  var followObjects = user.user_follows;

  _tracks.forEach( function (track) {
    if (track.user_id === user.id) {
      userTracks.push(track);
    } else {
      for (var i = 0; i < followObjects.length; i++) {
        if (followObjects[i].track_id === track.id) {
          userTracks.unshift(track);
        }
      }
    }
  });
  return userTracks;
};

TrackStore.__onDispatch = function (payload) {
switch(payload.actionType) {
  case TrackConstants.TRACKS_RECEIVED:
    resetTracks(payload.tracks);
    TrackStore.__emitChange();
    break;
  case TrackConstants.ADD_TRACK:
    addTrack(payload.track);
    TrackStore.__emitChange();
    break;
  case TrackConstants.TRACK_ADDED:
    addTrack(payload.track);
    TrackStore.__emitChange();
    break;
  case TrackConstants.UPDATED_TRACK:
    updateTracks(payload.track);
    TrackStore.__emitChange();
    break;
  case TrackConstants.DELETE_TRACK:
    deleteTrack(payload.track);
    TrackStore.__emitChange();
    break;
  }
};

window.TrackStore = TrackStore;

module.exports = TrackStore;
