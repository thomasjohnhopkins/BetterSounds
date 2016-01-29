var CurrentUserActions = require('../actions/current_user_actions');

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
      }
    });
  }
};

module.exports = SessionApiUtil;
