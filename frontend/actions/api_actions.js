var AppDispatcher = require('../dispatcher/dispatcher');
var SessionConstants = require('../constants/session_constants');

ApiActions = {
  logInUser: function(user) {
    debugger
    AppDispatcher.dispatch({
      actionType: SessionConstants.USER_CONFIRMED,
      user: user
    });
  },

};

module.exports = ApiActions;
