var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var UserFollowConstants = require('../constants/user_follow_constants');

var _userFollows = [];

var UserFollowStore = new Store(AppDispatcher);

var removeUserFollow = function (userFollow) {
  for (var i = 0; i < _userFollows.length; i++) {
    if (_userFollows[i].id === userFollow.id) {
      _userFollows.splice(i, 1);
    }
  }
  UserFollowStore.__emitChange();
};

var addUserFollow = function (userFollow) {
  if (_userFollows.indexOf(userFollow) === -1) {
    _userFollows.push(userFollow);
  }

  UserFollowStore.__emitChange();
};

var resetUserFollows = function (userFollows) {
  _userFollows = userFollows;

  UserFollowStore.__emitChange();
};

UserFollowStore.allUserFollows = function () {
  return _userFollows.slice(0);
};

UserFollowStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserFollowConstants.ADD_USER_FOLLOW:
      addUserFollow(payload.userFollow);
      break;
    case UserFollowConstants.REMOVE_USER_FOLLOW:
      removeUserFollow(payload.userFollow);
      break;
    case UserFollowConstants.RESET_USER_FOLLOWS:
      resetUserFollows(payload.userFollows);
      break;
  }
};

module.exports = UserFollowStore;
