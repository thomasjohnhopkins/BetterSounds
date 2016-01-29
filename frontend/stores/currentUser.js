var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var SessionConstants = require('../constants/session_constants');

var _currentUser = {};
var _currentUserHasBeenFetched = false;
var CurrentUserStore = new Store(AppDispatcher);

CurrentUserStore.currentUser = function () {
  return $.extend({}, _currentUser);
};

CurrentUserStore.isLoggedIn = function () {
  return !!_currentUser.id;
};

CurrentUserStore.userHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

CurrentUserStore.__onDispatch = function (payload) {
  if (payload.actionType === SessionConstants.USER_CONFIRMED) {
    // do stuff
    _currentUserHasBeenFetched = true;
    _currentUser = payload.currentUser;
    CurrentUserStore.__emitChange();
  }
};

CurrentUserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SessionConstants.USER_CONFIRMED:
      _currentUserHasBeenFetched = true;
      _currentUser = payload.currentUser;
      CurrentUserStore.__emitChange();
      break;
    case SessionConstants.USER_LOGGED_OUT:
      _currentUser = {};
      CurrentUserStore.__emitChange();
      break;
  }
};

module.exports = CurrentUserStore;
