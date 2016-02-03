var AppDispatcher = require('../dispatcher/app_dispatcher');
var ErrorConstants = require('../constants/error_constants');

var ErrorActions = {
  displayErrors: function (errors) {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.RECEIVE_ERRORS,
      errors: errors
    });
  },

};

module.exports = ErrorActions;
