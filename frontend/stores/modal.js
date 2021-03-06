var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/app_dispatcher');
var ModalConstants = require('../constants/modal_constants');

var _currentModal = null;

var CurrentModalStore = new Store(AppDispatcher);

CurrentModalStore.currentModal = function () {
  return _currentModal;
};

var setCurrentModal = function (modal) {
  _currentModal = modal;
};

var setModalAndArgument = function (modal, second) {
  _currentModal = [modal];
};

var removeCurrentModal = function () {
  _currentModal = null;
};

CurrentModalStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case ModalConstants.SET_MODAL:
      setCurrentModal(payload.modal);
      CurrentModalStore.__emitChange();
      break;
    case ModalConstants.SET_MODAL_PLUS:
      setModalAndArgument(payload.modal, payload.second);
      CurrentModalStore.__emitChange();
      break;
    case ModalConstants.REMOVE_MODAL:
      removeCurrentModal();
      CurrentModalStore.__emitChange();
      break;
  }
};

module.exports = CurrentModalStore;
