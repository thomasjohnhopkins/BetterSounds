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
        console.log('edit success');
      },
      error: function (data) {
        console.log('edit error');
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
        console.log('sign up success');
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
        console.log('fetch users success');
      },
      error: function (data) {
        console.log('fetch users failure');
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
        console.log('add comment success');
      },
      error: function (data) {
        console.log('add comment error');
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
        console.log('fetch comment success');
      },
      error: function (data) {
        console.log('fetch comment error');
      }
    });
  }
};

module.exports = ApiUtil;
