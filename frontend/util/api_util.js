var CurrentUserActions = require('../actions/current_user_actions');
var ApiActions = require('../actions/api_actions');
var SessionsApiUtil = require('./sessions_api_util');

var ApiUtil = {
  signUserUp: function (formData, success) {
    $.ajax({
      type: "POST",
      url: "api/users",
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function (user) {
        CurrentUserActions.receiveCurrentUser(user);
        console.log('sign up success');
        success && success();
      },
      error: function (data) {
        console.log('sign up error');
      }

    });
  },

  fetchAllTracks: function () {
    $.ajax({
      type: "GET",
      url: "api/tracks",
      dataType: "json",
      success: function (data) {
        ApiActions.sendAllTracks(data);
        console.log('fetch track success');
      },
      error: function (data) {
        console.log('fetch track failure');
      }
    });
  },

  addTrack: function (formData) {
    $.ajax({
      type: "POST",
      url: "api/tracks",
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function (data) {
        ApiActions.uploadTrack(data);
        console.log('add track success');
      },
      error: function (data) {
        console.log('add track error');
      }

    });
  }
};

module.exports = ApiUtil;
