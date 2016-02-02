var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var UserConstants = require('../constants/user_constants');

var _users = [];

var UserStore = new Store(AppDispatcher);

var resetUsers = function (users) {
  _users = users;
  UserStore.__emitChange();
};

UserStore.findUser = function (id) {
  var selectedUser;
  debugger
  _users.forEach( function (user) {
    if (user.id === id) {
      selectedUser = user;
    }
  });
  return selectedUser;
};

UserStore.__onDispatch = function (payload) {
switch(payload.actionType) {
  case UserConstants.RESET_USERS:
    resetUsers(payload.users);
    break;
  }
};

module.exports = UserStore;
