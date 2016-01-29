var React = require('react');
var ApiUtil = require('../../util/api_util');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ModalUtil = require('../../util/modal_util');
var CurrentUserStore = require('../../stores/currentUser');


var EditUserForm = React.createClass({
  mixins: [LinkedStateMixin, History],


  getInitialState: function () {
   return ({username: this.props.user.username,
     email: this.props.user.email,
     description: this.props.user.description
   });
  },

  closeForm: function (e) {
  e.preventDefault();
  ModalUtil.removeCurrentModal();
  },

  // changeFile: function(e) {
  //   var reader = new FileReader();
  //   var file = e.currentTarget.files[0];
  //   if (file) {
  //     reader.onloadend = function () {
  //       this.setState({imageFile: file, imageUrl: reader.result});
  //     }.bind(this);
  //     reader.readAsDataURL(file);
  //   } else {
  //     this.setState({imageFile: null, imageUrl: ""});
  //   }
  // },

  editProfile: function(e) {
    e.preventDefault();
    ModalUtil.removeCurrentModal();

    var formData = new FormData();

    formData.append("user[username]", this.state.username);
    formData.append("user[email]", this.state.email);
    formData.append("user[description]", this.state.description);
    // if (imageFile === "") {
    //   formData.append("user[image]", this.props.user.imageFile)
    // } else {
    //   formData.append("user[image]", this.state.imageFile);
    // }

    var userId = this.props.user.id;

    ApiUtil.editUserInfo(formData, userId);

    this.resetForm();
  },

  resetForm: function() {
    this.setState({username: "", email: "", description: ""});
  },

  render: function () {
  return(
    <div>
      <div className='overlay' onClick={this.closeForm}></div>
      <div className='modal'>
      <p>Update your information below</p>
        <form className="form-session group" onSubmit={this.editProfile}>
          <label>Change your username</label>
          <input type="text"
            valueLink={this.linkState("username")} />

          <label>Update your email address</label>
          <input type="text"
            valueLink={this.linkState("email")} />
          
          <label>Change your location</label>
            <input type="text"
            valueLink={this.linkState("description")} />

          <ul className="form-buttons group">
            <li className="form-li">
              <button className="cancel" onClick={this.closeForm}>
                Cancel
              </button>
            </li>
            <li className="form-li">
              <button className="sign-button" type="submit">
                Update your information
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
    );
  }
});

module.exports = EditUserForm;
