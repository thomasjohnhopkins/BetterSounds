var AppDispatcher = require('../dispatcher/app_dispatcher.js');
var ModalConstants = require('../constants/modal_constants');


ModalActions = {
  setModal: function (modal) {
    AppDispatcher.dispatch({
      actionType: ModalConstants.SET_MODAL,
      modal: modal
    });
  },

  setModalPlus: function (modal) {
    AppDispatcher.dispatch({
      actionType: ModalConstants.SET_MODAL_PLUS,
      modal: modal
    });
  },

  removeModal: function () {
    AppDispatcher.dispatch({
      actionType: ModalConstants.REMOVE_MODAL,
    });
  },
};

module.exports = ModalActions;
