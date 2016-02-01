var React = require('react');
var ApiUtil = require('../util/api_util');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ModalUtil = require('../util/modal_util');
var SessionsApiUtil = require('../util/sessions_api_util');

var LogIn = React.createClass({
  mixins: [LinkedStateMixin, History],


 getInitialState: function () {
   return ({username: "",
    email: "",
    password: "",
    description: "",
    bio: "",
    website: "",
    imageFile: null,
    imageUrl: ""});
 },

 closeForm: function (e) {
  e.preventDefault();
  ModalUtil.removeCurrentModal();
 },

 changeFile: function(e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({imageFile: file, imageUrl: reader.result});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file); // will trigger a load end event when it completes, and invoke reader.onloadend
    } else {
      this.setState({imageFile: null, imageUrl: ""});
    }
  },

  signUp: function(e) {
    e.preventDefault();
    ModalUtil.removeCurrentModal();

    var formData = new FormData();

    formData.append("user[username]", this.state.username);
    formData.append("user[email]", this.state.email);
    formData.append("user[password]", this.state.password);
    formData.append("user[description]", this.state.description);
    formData.append("user[image]", this.state.imageFile);

    ApiUtil.signUserUp(formData, function () {
       this.history.pushState({}, "/");
     }.bind(this));

    this.resetForm();
  },

  resetForm: function() {
    this.setState({username: "", email: "", password: "", description: "", imageFile: null, imageUrl: ""});
  },

 render: function () {
  var previewImage = "preview-image";

  if (this.state.imageUrl === "") {
    previewImage = "no-preview-image";
  }

  return(
    <div>
      <div className='overlay' onClick={this.closeForm}></div>
      <div className='modal'>
      <p className="sign-up-form">
        Discover Artists and Share Your Own Music.
      </p>
      <p className="sign-up-form">
        Sign Up and Discover what BetterSounds Has to Offer.
      </p>
        <form className="form-session group" onSubmit={this.signUp}>
          <label>Choose a username</label>
          <input type="text"
            valueLink={this.linkState("username")} />

          <label>What's your email address?</label>
          <input type="text"
            valueLink={this.linkState("email")} />

          <label>Choose a password</label>
            <input type="password"
              valueLink={this.linkState("password")} />

          <label>Where are you from</label>
          <input type="text"
            valueLink={this.linkState("description")} />

          <label>Add a website</label>
          <input type="text"
            valueLink={this.linkState("website")} />

          <label>Tell us about yourself</label>
          <textarea
            valueLink={this.linkState("bio")} />

          <label>Upload Profile Picture</label>
          <input id="file-upload" type="file" onChange={this.changeFile} />


          <img className={previewImage} src={this.state.imageUrl}/>

          <ul className="form-buttons group">
            <li className="form-li">
              <button className="cancel" onClick={this.closeForm}>
                Cancel
              </button>
            </li>
            <li className="form-li">
              <button className="sign-button" type="submit">
                Sign Up
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
    );
  }
});

module.exports = LogIn;
