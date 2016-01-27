var ModalActions = require('../actions/modal_actions');

var ModalUtil = {
  setCurrentModal: function (modal) {
    ModalActions.setModal(modal);
  }
};

module.exports = ModalUtil;
