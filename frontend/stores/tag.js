var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var TagConstants = require('../constants/tag_constants');

var _tags = [];

var TagStore = new Store(AppDispatcher);

var restTags = function (tags) {
  _tags = tags;

  TagStore.__emitChange();
};

TagStore.allTags = function () {
  return _tags.slice(0);
};

TagStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case TagConstants.RESET_TAGS:
      restTags(payload.tags);
      break;
  }
};

module.exports = TagStore;
