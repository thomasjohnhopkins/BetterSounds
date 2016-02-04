var CurrentUserActions = require('../actions/current_user_actions');
var ApiActions = require('../actions/api_actions');
var SessionsApiUtil = require('./sessions_api_util');
var ErrorActions = require('../actions/error_actions');

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
      error: function (errors) {
      }

    });
  },

  editTrackInfo: function (formData, trackId) {
    $.ajax({
      type: "PATCH",
      url: "api/tracks/" + trackId,
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function (track) {
        ApiActions.updateTrack(track);
      },
      error: function (errors) {
      }

    });
  },

  addPlay: function (formData, trackId) {

    $.ajax({
      type: "PATCH",
      url: "api/tracks/" + trackId,
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function (track) {
        ApiActions.updateTrack(track);
      },
      error: function (errors) {
      }

    });
  },

  deleteTrack: function (trackId) {
    $.ajax({
      type: "DELETE",
      url: "api/tracks/" + trackId,
      dataType: 'json',
      success: function (track) {
        ApiActions.deleteTrack(track);
      },
      error: function (errors) {
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
      error: function (errors) {
        ErrorActions.displayErrors("Sorry. The required fields were not completed, please try again.");
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

  fetchUserFollows: function () {
    $.ajax({
      type: "GET",
      url: "api/user_follows",
      dataType: 'json',
      success: function (data) {
        ApiActions.resetUserFollows(data);
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
        ApiActions.addUserFollow(data);
      },
      error: function (data) {

      }
    });
  },

  unfollowTrack: function (id) {
    $.ajax({
      type: "DELETE",
      url: "api/user_follows/" + id,
      processData: false,
      contentType: false,
      dataType: 'json',
      success: function (data) {
        ApiActions.removeUserFollow(data);
      },
      error: function (data) {

      }
    });
  },

  fetchUserLikes: function () {
    $.ajax({
      type: "GET",
      url: "api/user_likes",
      dataType: 'json',
      success: function (data) {
        ApiActions.resetUserLikes(data);
      }
    });
  },

  likeTrack: function (formData) {
    $.ajax({
      type: "POST",
      url: "api/user_likes",
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function (data) {
        ApiActions.addUserLike(data);
      },
      error: function (data) {

      }
    });
  },

  unlikeTrack: function (id) {
    $.ajax({
      type: "DELETE",
      url: "api/user_likes/" + id,
      processData: false,
      contentType: false,
      dataType: 'json',
      success: function (data) {
        ApiActions.removeUserLike(data);
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
  },

  fetchAllTags: function () {
    $.ajax({
      type: "GET",
      url: "/api/tags",
      dataType: 'json',
      success: function (data) {
        ApiActions.setTags(data);
      },
      error: function (data) {

      }
    });
  },
};

module.exports = ApiUtil;
