var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var UserConstants = require('../constants/user_constants');

var _users = [];

var UserStore = new Store(AppDispatcher);

var resetUsers = function (users) {
  _users = users;
  UserStore.__emitChange();
};

var updateUsers = function (user) {
  for (var i = 0; i < _users.length; i++) {
    if (_users[i].id === user.id) {
      _users[i] = user;
    }
  }
  UserStore.__emitChange();
};

UserStore.findUser = function (id) {
  var selectedUser;

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
  case UserConstants.UPDATED_USER:
    updateUsers(payload.user);
  }
};

module.exports = UserStore;
