var CurrentUserActions = require('../actions/current_user_actions');

var ApiUtil = {
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
