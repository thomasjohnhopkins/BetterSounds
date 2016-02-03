var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var UserLikeConstants = require('../constants/user_like_constants');

var _userLikes = [];

var UserLikeStore = new Store(AppDispatcher);

var removeUserLike = function (userLike) {
  for (var i = 0; i < _userLikes.length; i++) {
    if (_userLikes[i].id === userLike.id) {
      _userLikes.splice(i, 1);
    }
  }
  UserLikeStore.__emitChange();
};

var addUserLike = function (userLike) {
  if (_userLikes.indexOf(userLike) === -1) {
    _userLikes.push(userLike);
  }

  UserLikeStore.__emitChange();
};

var resetUserLikes = function (userLikes) {
  _userLikes = userLikes;

  UserLikeStore.__emitChange();
};

UserLikeStore.allUserLikes = function () {
  return _userLikes.slice(0);
};

UserLikeStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserLikeConstants.ADD_USER_LIKE:
      addUserLike(payload.userLike);
      break;
    case UserLikeConstants.REMOVE_USER_LIKE:
      removeUserLike(payload.userLike);
      break;
    case UserLikeConstants.RESET_USER_LIKES:
      resetUserLikes(payload.userLikes);
      break;
  }
};

module.exports = UserLikeStore;
