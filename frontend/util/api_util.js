var ApiActions = require('../actions/api_actions');

var ApiUtil = {
  logUserIn: function (user) {
    $.ajax({
      type: "POST",
      url: "api/session",
      data: {user: user},
      dataType: "json",
      success: function (data) {
        ApiActions.logInUser(data);
        console.log('log in success');
      },
      error: function (data) {
        console.log('log in error');
      }

    });
  },

  signUserUp: function (formData) {
    $.ajax({
      type: "POST",
      url: "api/users",
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function (data) {
        ApiActions.signUpUser(data);
        console.log('sign up success');
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
