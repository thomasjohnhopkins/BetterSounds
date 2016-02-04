var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var TagConstants = require('../constants/tag_constants');

var _taggings = [];

var TaggingStore = new Store(AppDispatcher);

var restTags = function (taggings) {
  _taggings = taggings;

  TaggingStore.__emitChange();
};

TaggingStore.allTags = function () {
  return _taggings.slice(0);
};

TaggingStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case TagConstants.RESET_TAGGINGS:
      restTags(payload.taggings);
      break;
  }
};

module.exports = TaggingStore;
