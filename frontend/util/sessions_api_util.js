var CurrentUserActions = require('../actions/current_user_actions');
var ErrorActions = require('../actions/error_actions');

var SessionApiUtil = {
  logUserIn: function (user, success) {
    $.ajax({
      url: '/api/session',
      type: 'POST',
      dataType: 'json',
      data: {user: user},
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
        success && success();
      },
      error: function (errors) {
        ErrorActions.displayErrors(errors.responseText);
      }
    });
  },

  logUserOut: function (success) {
    $.ajax({
      url: '/api/session',
      type: 'DELETE',
      dataType: 'json',
      success: function (currentUser) {
        CurrentUserActions.removeCurrentUser();
        success && success();
      }
    });
  },

  fetchCurrentUser: function (cb) {
    $.ajax({
      url: '/api/session',
      type: 'GET',
      dataType: 'json',
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
        cb && cb(currentUser);
      }
    });
  }
};

module.exports = SessionApiUtil;
