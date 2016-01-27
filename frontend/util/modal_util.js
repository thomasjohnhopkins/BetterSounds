var ModalActions = require('../actions/modal_actions');

var ModalUtil = {
  setCurrentModal: function (modal) {
    ModalActions.setModal(modal);
  },

  removeCurrentModal: function () {
    ModalActions.removeModal();
  }
};

module.exports = ModalUtil;
