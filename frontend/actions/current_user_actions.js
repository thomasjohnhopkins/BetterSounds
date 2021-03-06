var AppDispatcher = require('../dispatcher/app_dispatcher');
var SessionConstants = require('../constants/session_constants');

var CurrentUserActions = {
  receiveCurrentUser: function (currentUser) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.USER_CONFIRMED,
      currentUser: currentUser
    });
  },

  removeCurrentUser: function () {
    AppDispatcher.dispatch({
      actionType: SessionConstants.USER_LOGGED_OUT
    });
  }
};

module.exports = CurrentUserActions;
