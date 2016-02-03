var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ErrorConstants = require('../constants/error_constants');

var _errors = [];

var ErrorStore = new Store(AppDispatcher);

var display = function (errors) {
  _errors.push(errors);
  ErrorStore.__emitChange();
};

ErrorStore.all = function () {
  return _errors.slice(0);
};

ErrorStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case ErrorConstants.RECEIVE_ERRORS:
      display(payload.errors);
      break;
  }
};

module.exports = ErrorStore;
