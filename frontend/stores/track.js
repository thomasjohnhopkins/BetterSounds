var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
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
  }
};

window.TrackStore = TrackStore;

module.exports = TrackStore;
