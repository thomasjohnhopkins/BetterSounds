var Modal = require('react-modal-component');

var ModalTest = React.createClass({
  getInitialState: function() {
    return { showModal: false };
  },
  openModal: function() {
    this.setState({showModal: true});
  },
  closeModal: function() {
    this.setState({showModal: false});
  },
  render: function() {
    var node = null;

    if (this.state.showModal) {
      node = (
        <Modal transitionName='fade'>
          <h3>Plain old Modal</h3>
          <button onClick={this.closeModal}>Close Dialog</button>
        </Modal>
      );
    }

    return (
        <div>
         <button onClick={this.openModal}>Show Dialog</button>
         {node}
        </div>
      );
  }
});

module.exports = ModalTest;
