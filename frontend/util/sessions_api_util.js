var CurrentUserActions = require('../actions/current_user_actions');

var SessionApiUtil = {
  logUserIn: function (user, success) {
    $.ajax({
      url: '/api/session',
      type: 'POST',
      dataType: 'json',
      data: {user: user},
      success: function (currentUser) {
        console.log("user logged in!");
        CurrentUserActions.receiveCurrentUser(currentUser);
        success && success();
      }
    });
  },

  logUserOut: function (success) {
    $.ajax({
      url: '/api/session',
      type: 'DELETE',
      dataType: 'json',
      success: function (currentUser) {
        console.log("user logged out!");
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

        console.log("fetched current user!");
        CurrentUserActions.receiveCurrentUser(currentUser);
        cb && cb(currentUser);
      }
    });
  }
};

module.exports = SessionApiUtil;
