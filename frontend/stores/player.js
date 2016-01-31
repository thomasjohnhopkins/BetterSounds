var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var AudioPlayerConstants = require('../constants/audio_player_constants');

var _track = {};
var _playRequested = false;
var _pauseRequested = false;
var _adjustVolumeTo = null;
var _isPlaying = false;
var _isPaused = false;
var _isEnded = false;
var _currentTime = 0;
var _volume = null;
var _duration = 0;


var AudioPlayerStore = new Store(AppDispatcher);

AudioPlayerStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case AudioPlayerConstants.SET_TRACK:
      setTrack(payload.track);
      break;

    case AudioPlayerConstants.PLAY_AUDIO:
      setPlayRequest();
      break;

    case AudioPlayerConstants.PAUSE_AUDIO:
      setPauseRequest();
      break;

    case AudioPlayerConstants.ADJUST_VOLUME_TO:
      setAdjustVolumeTo(payload.volume);
      AudioPlayerStore.__emitChange();
      break;

    case AudioPlayerConstants.AUDIO_PLAYING:
      setToPlay();
      break;

    case AudioPlayerConstants.AUDIO_PAUSED:
      setToPause();
      break;

    case AudioPlayerConstants.AUDIO_ENDED:
      setToEnded();
      break;

    case AudioPlayerConstants.AUDIO_CURRENT_TIME_RECEIVED:
      setCurrentTime(payload.time);
      break;

    case AudioPlayerConstants.AUDIO_VOLUME_RECEIVED:
      setVolume(payload.volume);
      break;

    case AudioPlayerConstants.AUDIO_DURATION_RECEIVED:
      setDuration(payload.duration);
      break;

    case AudioPlayerConstants.RESET_AUDIO_PLAYER_REQUESTS:
      resetRequests();
      break;
  }
};

AudioPlayerStore.fetchTrack = function () {
  var trackCopy = _track;

  return trackCopy;
};

AudioPlayerStore.playTrack = function () {
  return _playRequested;
};

AudioPlayerStore.pauseTrack = function () {
  return _pauseRequested;
};

AudioPlayerStore.changeVolumeTo = function () {
  return _adjustVolumeTo;
};

AudioPlayerStore.isPlaying = function () {
  return _isPlaying;
};

AudioPlayerStore.isPaused = function () {
  return _isPaused;
};

AudioPlayerStore.isEnded = function () {
  return _isEnded;
};

AudioPlayerStore.getCurrentTime = function () {
  return _currentTime;
};

AudioPlayerStore.getVolume = function () {
  return _volume;
};

AudioPlayerStore.getDuration = function () {
  return _duration;
};

var setTrack = function (track) {
  _track = {};
  _track = track;
  AudioPlayerStore.__emitChange();
};

var setPlayRequest = function () {
  _playRequested = true;

  AudioPlayerStore.__emitChange();
};

var setPauseRequest = function () {
  _pauseRequested = true;

  AudioPlayerStore.__emitChange();
};

var setAdjustVolumeTo = function (volume) {
  _adjustVolumeTo = volume;

  AudioPlayerStore.__emitChange();
};

var setToPlay = function () {
  _isPlaying = true;
  _isPaused = false;
  _isEnded = false;

  AudioPlayerStore.__emitChange();
};

var setToPause = function () {
  _isPlaying = false;
  _isPaused = true;
  _isEnded = false;

  AudioPlayerStore.__emitChange();
};

var setToEnded = function () {
  _isPlaying = false;
  _isPaused = false;
  _isEnded = true;
  _currentTime = 0;
  _volume = null;
  _duration = 0;

  AudioPlayerStore.__emitChange();
};

var setCurrentTime = function (time) {
  _currentTime = time;

  AudioPlayerStore.__emitChange();
};

var setVolume = function (volume) {
  _volume = volume;

  AudioPlayerStore.__emitChange();
};

var setDuration = function (duration) {
  _duration = duration;

  AudioPlayerStore.__emitChange();
};

var resetRequests = function () {
  _playRequested = false;
  _pauseRequested = false;
  _adjustVolumeTo = null;

  AudioPlayerStore.__emitChange();
};

module.exports = AudioPlayerStore;
