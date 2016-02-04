var ModalActions = require('../actions/modal_actions');

var ModalUtil = {
  setCurrentModal: function (modal) {

    if (modal.id === undefined) {
      ModalActions.setModal(modal);
    } else {
      ModalActions.setModalPlus(modal);
    }
  },

  removeCurrentModal: function () {
    ModalActions.removeModal();
  }
};

module.exports = ModalUtil;
