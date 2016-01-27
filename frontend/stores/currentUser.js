var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var UserConstants = require('../constants/user_constants');
var SessionConstants = require('../constants/session_constants');

var _currentUser = {};

var CurrentUserStore = new Store(AppDispatcher);

CurrentUserStore.currentUser = function () {
  return _currentUser;
};

var setCurrentUser = function (user) {
  _currentUser = user;
};

CurrentUserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SessionConstants.USER_CONFIRMED:
      setCurrentUser(payload.user);
      CurrentUserStore.__emitChange();
      break;
    case UserConstants.NEW_USER:
      setCurrentUser(payload.user);
      CurrentUserStore.__emitChange();
      break;
  }
};

module.exports = CurrentUserStore;
