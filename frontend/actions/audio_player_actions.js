var AppDispatcher = require('../dispatcher/app_dispatcher.js');
var AudioPlayerConstants = require('../constants/audio_player_constants');

var AudioPlayerActions = {
  setTrack: function (track) {
    AppDispatcher.dispatch({
      actionType: AudioPlayerConstants.SET_TRACK,
      track: track
    });
  },

  setToIsPlaying: function () {
    AppDispatcher.dispatch({
      actionType: AudioPlayerConstants.AUDIO_PLAYING
    });
  },

  setToIsPaused: function () {
    AppDispatcher.dispatch({
      actionType: AudioPlayerConstants.AUDIO_PAUSED
    });
  },

  setToOver: function () {
    AppDispatcher.dispatch({
      actionType: AudioPlayerConstants.AUDIO_ENDED
    });
  },

  setCurrentTime: function (time) {
    AppDispatcher.dispatch({
      actionType: AudioPlayerConstants.AUDIO_CURRENT_TIME_RECEIVED,
      time: time
    });
  },

  setVolume: function (volume) {
    AppDispatcher.dispatch({
      actionType: AudioPlayerConstants.AUDIO_VOLUME_RECEIVED,
      volume: volume
    });
  },

  getDuration: function (duration) {
    AppDispatcher.dispatch({
      actionType: AudioPlayerConstants.AUDIO_DURATION_RECEIVED,
      duration: duration
    });
  },

  playAudio: function () {
    AppDispatcher.dispatch({
      actionType: AudioPlayerConstants.PLAY_AUDIO
    });
  },

  pauseAudio: function () {
    AppDispatcher.dispatch({
      actionType: AudioPlayerConstants.PAUSE_AUDIO
    });
  },

  changeVolume: function (volume) {
    AppDispatcher.dispatch({
      actionType: AudioPlayerConstants.CHANGE_VOLUME_TO,
      volume: volume
    });
  },

  resetRequests: function () {
    AppDispatcher.dispatch({
      actionType: AudioPlayerConstants.RESET_AUDIO_PLAYER_REQUESTS
    });
  },
};

module.exports = AudioPlayerActions;
