var CurrentUserActions = require('../actions/current_user_actions');
var ApiActions = require('../actions/api_actions');
var SessionsApiUtil = require('./sessions_api_util');

var ApiUtil = {
  editUserInfo: function (formData, userId) {
    $.ajax({
      type: "PATCH",
      url: "api/users/" + userId,
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function (user) {
        ApiActions.updateUser(user);

      },
      error: function (data) {

      }

    });
  },

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

        success && success();
      },
      error: function (data) {
        console.log('sign up error');
      }

    });
  },

  fetchUsers: function () {
    $.ajax({
      type: "GET",
      url: "api/users",
      dataType: "json",
      success: function (data) {
        ApiActions.sendUsers(data);

      },
      error: function (data) {

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

      },
      error: function (data) {

      }
    });
  },

  fetchTrack: function (id) {
    $.ajax({
      type: "GET",
      url: "api/tracks" + id,
      dataType: "json",
      success: function (data) {
        ApiActions.sendTrack(data);

      },
      error: function (data) {

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

      },
      error: function (data) {

      }
    });
  },

  followTrack: function (formData) {
    $.ajax({
      type: "POST",
      url: "api/user_follows",
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function (data) {
        debugger
      },
      error: function (data) {

      }
    });
  },

  postComment: function (comment, track_id) {
    $.ajax({
      type: "POST",
      url: "/api/tracks/" + track_id + "/comments",
      processData: false,
      contentType: false,
      dataType: 'json',
      data: comment,
      success: function (data) {
        ApiActions.postComment(data);

      },
      error: function (data) {

      }
    });
  },

  fetchComments: function (track_id) {
    $.ajax({
      type: "GET",
      url: "/api/tracks/" + track_id + "/comments",
      processData: false,
      contentType: false,
      dataType: 'json',
      success: function (data) {
        ApiActions.setComments(data);

      },
      error: function (data) {

      }
    });
  }
};

module.exports = ApiUtil;
